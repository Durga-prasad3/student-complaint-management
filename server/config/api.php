<?php

require_once __DIR__ . "/database.php";

function requestData(): array
{
    $contentType = $_SERVER["CONTENT_TYPE"] ?? "";

    if (stripos($contentType, "application/json") !== false) {
        $data = json_decode(file_get_contents("php://input"), true);
        return is_array($data) ? $data : [];
    }

    return $_POST;
}

function respond(array $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
}

function publicUser(array $user): array
{
    unset($user["password"]);
    return $user;
}

function authenticatedUser(): ?array
{
    global $pdo;

    $header = $_SERVER["HTTP_AUTHORIZATION"] ?? "";
    if (!preg_match('/^Bearer\s+(.+)$/i', $header, $matches)) {
        return null;
    }

    $tokenHash = hash("sha256", trim($matches[1]));
    $query = $pdo->prepare(
        "SELECT u.id, u.name, u.email, u.phone, u.department, u.role
         FROM auth_tokens t
         JOIN users u ON u.id = t.user_id
         WHERE t.token_hash = ? AND t.expires_at > NOW()"
    );
    $query->execute([$tokenHash]);
    $user = $query->fetch();

    return $user ?: null;
}

function requireUser(): array
{
    $user = authenticatedUser();
    if (!$user) {
        respond(["success" => false, "message" => "Authentication required"], 401);
        exit;
    }

    return $user;
}

function requireRole(array $user, array $roles): void
{
    if (!in_array($user["role"], $roles, true)) {
        respond(["success" => false, "message" => "You do not have permission to perform this action"], 403);
        exit;
    }
}

function issueToken(int $userId): string
{
    global $pdo;

    $token = bin2hex(random_bytes(32));
    $insert = $pdo->prepare(
        "INSERT INTO auth_tokens (user_id, token_hash, expires_at)
         VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY))"
    );
    $insert->execute([$userId, hash("sha256", $token)]);

    return $token;
}