
<?php

require_once __DIR__ . "/../config/api.php";

class AuthController
{
    public function register()
    {
        global $pdo;

        $data = requestData();

        $name = trim($data["name"] ?? "");
        $email = trim($data["email"] ?? "");
        $password = $data["password"] ?? "";
        $phone = trim($data["phone"] ?? "");
        $department = trim($data["department"] ?? "");
        $role = "student";

        if (
            empty($name) ||
            empty($email) ||
            empty($password)
        ) {
            http_response_code(400);

            echo json_encode([
                "success" => false,
                "message" => "Name, email and password are required"
            ]);

            return;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);

            echo json_encode([
                "success" => false,
                "message" => "Invalid email address"
            ]);

            return;
        }

        if (strlen($password) < 6) {
            http_response_code(400);

            echo json_encode([
                "success" => false,
                "message" => "Password must contain at least 6 characters"
            ]);

            return;
        }

        $checkQuery = $pdo->prepare(
            "SELECT id FROM users WHERE email = ?"
        );

        $checkQuery->execute([$email]);

        if ($checkQuery->fetch()) {
            http_response_code(409);

            echo json_encode([
                "success" => false,
                "message" => "Email already registered"
            ]);

            return;
        }

        $hashedPassword = password_hash(
            $password,
            PASSWORD_DEFAULT
        );

        $query = $pdo->prepare(
            "INSERT INTO users
            (name, email, password, phone, department, role)
            VALUES (?, ?, ?, ?, ?, ?)"
        );

        $query->execute([
            $name,
            $email,
            $hashedPassword,
            $phone,
            $department,
            $role
        ]);

        $userId = $pdo->lastInsertId();
        $token = issueToken((int) $userId);

        http_response_code(201);

        echo json_encode([
            "success" => true,
            "message" => "Registration successful",
            "token" => $token,
            "user" => [
                "id" => $userId,
                "name" => $name,
                "email" => $email,
                "phone" => $phone,
                "department" => $department,
                "role" => $role
            ]
        ]);
    }


    public function login()
    {
        global $pdo;

        $data = requestData();

        $email = trim($data["email"] ?? "");
        $password = $data["password"] ?? "";

        if (
            empty($email) ||
            empty($password)
        ) {
            http_response_code(400);

            echo json_encode([
                "success" => false,
                "message" => "Email and password are required"
            ]);

            return;
        }

        $query = $pdo->prepare(
            "SELECT
                id,
                name,
                email,
                password,
                phone,
                department,
                role
             FROM users
             WHERE email = ?"
        );

        $query->execute([$email]);

        $user = $query->fetch();

        if (!$user) {
            http_response_code(401);

            echo json_encode([
                "success" => false,
                "message" => "Invalid email or password"
            ]);

            return;
        }

        if (
            !password_verify(
                $password,
                $user["password"]
            )
        ) {
            http_response_code(401);

            echo json_encode([
                "success" => false,
                "message" => "Invalid email or password"
            ]);

            return;
        }

        if (($data["role"] ?? null) && $data["role"] !== $user["role"]) {
            respond(["success" => false, "message" => "Invalid email or password"], 401);
            return;
        }

        unset($user["password"]);
        $token = issueToken((int) $user["id"]);

        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "token" => $token,
            "user" => $user
        ]);
    }

    public function me(): void
    {
        $user = requireUser();
        respond(["success" => true, "user" => $user]);
    }

    public function logout(): void
    {
        global $pdo;

        $header = $_SERVER["HTTP_AUTHORIZATION"] ?? "";
        if (!preg_match('/^Bearer\s+(.+)$/i', $header, $matches)) {
            respond(["success" => false, "message" => "Authentication required"], 401);
            return;
        }

        $delete = $pdo->prepare("DELETE FROM auth_tokens WHERE token_hash = ?");
        $delete->execute([hash("sha256", trim($matches[1]))]);
        respond(["success" => true, "message" => "Logged out"]);
    }
}

