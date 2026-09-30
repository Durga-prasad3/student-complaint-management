<?php

require_once __DIR__ . "/../config/api.php";

class ComplaintController
{
    private const STATUSES = ["Submitted", "Under Review", "In Progress", "Resolved", "Closed"];
    private const PRIORITIES = ["Low", "Medium", "High", "Critical"];

    public function index(): void
    {
        global $pdo;

        $user = requireUser();
        $conditions = [];
        $params = [];

        if ($user["role"] === "student") {
            $conditions[] = "c.user_id = ?";
            $params[] = $user["id"];
        } elseif ($user["role"] === "staff") {
            if (empty($user["department"])) {
                $conditions[] = "1 = 0";
            } else {
                $conditions[] = "c.department = ?";
                $params[] = $user["department"];
            }
        }

        foreach (["status", "priority", "category", "department"] as $filter) {
            if (!empty($_GET[$filter])) {
                $conditions[] = "c.$filter = ?";
                $params[] = trim($_GET[$filter]);
            }
        }

        if (!empty($_GET["search"])) {
            $conditions[] = "(c.complaint_code LIKE ? OR c.title LIKE ? OR u.name LIKE ?)";
            $term = "%" . trim($_GET["search"]) . "%";
            array_push($params, $term, $term, $term);
        }

        $where = $conditions ? "WHERE " . implode(" AND ", $conditions) : "";
        $query = $pdo->prepare(
            "SELECT c.id, c.complaint_code AS code, c.title, c.description, c.category,
                    c.location, c.priority, c.status, c.department, c.image_path,
                    c.created_at, c.updated_at, c.user_id, u.name AS student,
                    a.name AS assigned_staff
             FROM complaints c
             JOIN users u ON u.id = c.user_id
             LEFT JOIN users a ON a.id = c.assigned_to
             $where
             ORDER BY c.created_at DESC"
        );
        $query->execute($params);
        respond(["success" => true, "complaints" => $query->fetchAll()]);
    }

    public function show(int $id): void
    {
        global $pdo;

        $user = requireUser();
        $query = $pdo->prepare(
            "SELECT c.id, c.complaint_code AS code, c.title, c.description, c.category,
                    c.location, c.priority, c.status, c.department, c.image_path,
                    c.created_at, c.updated_at, c.user_id, u.name AS student,
                    a.name AS assigned_staff
             FROM complaints c
             JOIN users u ON u.id = c.user_id
             LEFT JOIN users a ON a.id = c.assigned_to
             WHERE c.id = ?"
        );
        $query->execute([$id]);
        $complaint = $query->fetch();

        if (!$complaint) {
            respond(["success" => false, "message" => "Complaint not found"], 404);
            return;
        }

        if ($user["role"] === "student" && (int) $complaint["user_id"] !== (int) $user["id"]) {
            respond(["success" => false, "message" => "Complaint not found"], 404);
            return;
        }

        if ($user["role"] === "staff" && $complaint["department"] !== $user["department"]) {
            respond(["success" => false, "message" => "Complaint not found"], 404);
            return;
        }

        $history = $pdo->prepare(
            "SELECT h.status, h.note, h.created_at, u.name AS updated_by
             FROM complaint_history h JOIN users u ON u.id = h.updated_by
             WHERE h.complaint_id = ? ORDER BY h.created_at ASC"
        );
        $history->execute([$id]);
        $complaint["history"] = $history->fetchAll();
        respond(["success" => true, "complaint" => $complaint]);
    }

    public function create(): void
    {
        global $pdo;

        $user = requireUser();
        requireRole($user, ["student"]);
        $data = requestData();
        $fields = ["title", "description", "category", "location", "priority", "department"];

        foreach ($fields as $field) {
            if (!isset($data[$field]) || trim((string) $data[$field]) === "") {
                respond(["success" => false, "message" => ucfirst($field) . " is required"], 400);
                return;
            }
        }

        if (!in_array($data["priority"], self::PRIORITIES, true)) {
            respond(["success" => false, "message" => "Invalid priority"], 400);
            return;
        }

        $imagePath = $this->saveImage();
        if (isset($_FILES["image"]) && $_FILES["image"]["error"] !== UPLOAD_ERR_NO_FILE && $imagePath === null) {
            respond(["success" => false, "message" => "Image must be a PNG or JPEG under 5 MB"], 400);
            return;
        }

        $pdo->beginTransaction();
        try {
            $insert = $pdo->prepare(
                "INSERT INTO complaints
                    (user_id, title, description, category, location, priority, department, image_path)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
            );
            $insert->execute([
                $user["id"], trim($data["title"]), trim($data["description"]),
                trim($data["category"]), trim($data["location"]), $data["priority"],
                trim($data["department"]), $imagePath
            ]);
            $id = (int) $pdo->lastInsertId();
            $code = "CMP-" . str_pad((string) $id, 6, "0", STR_PAD_LEFT);
            $updateCode = $pdo->prepare("UPDATE complaints SET complaint_code = ? WHERE id = ?");
            $updateCode->execute([$code, $id]);
            $history = $pdo->prepare(
                "INSERT INTO complaint_history (complaint_id, status, note, updated_by)
                 VALUES (?, 'Submitted', 'Complaint submitted', ?)"
            );
            $history->execute([$id, $user["id"]]);
            $pdo->commit();
            respond(["success" => true, "message" => "Complaint submitted", "id" => $id, "code" => $code], 201);
        } catch (Throwable $error) {
            $pdo->rollBack();
            if ($imagePath !== null) {
                @unlink(__DIR__ . "/../uploads/" . basename($imagePath));
            }
            throw $error;
        }
    }

    public function update(int $id): void
    {
        global $pdo;

        $user = requireUser();
        requireRole($user, ["admin", "staff"]);
        $data = requestData();
        $query = $pdo->prepare("SELECT id, department, status FROM complaints WHERE id = ?");
        $query->execute([$id]);
        $complaint = $query->fetch();

        if (!$complaint || ($user["role"] === "staff" && $complaint["department"] !== $user["department"])) {
            respond(["success" => false, "message" => "Complaint not found"], 404);
            return;
        }

        $updates = [];
        $values = [];
        foreach (["status" => self::STATUSES, "priority" => self::PRIORITIES] as $field => $allowed) {
            if (isset($data[$field])) {
                if (!in_array($data[$field], $allowed, true)) {
                    respond(["success" => false, "message" => "Invalid $field"], 400);
                    return;
                }
                $updates[] = "$field = ?";
                $values[] = $data[$field];
            }
        }

        if ($user["role"] === "admin" && isset($data["department"])) {
            $updates[] = "department = ?";
            $values[] = trim($data["department"]);
        }

        if ($user["role"] === "admin" && array_key_exists("assigned_to", $data)) {
            $assignedId = $data["assigned_to"] === null ? null : (int) $data["assigned_to"];
            if ($assignedId !== null) {
                $staff = $pdo->prepare("SELECT id FROM users WHERE id = ? AND role = 'staff'");
                $staff->execute([$assignedId]);
                if (!$staff->fetch()) {
                    respond(["success" => false, "message" => "Assigned user must be a staff member"], 400);
                    return;
                }
            }
            $updates[] = "assigned_to = ?";
            $values[] = $assignedId;
        }

        if (!$updates) {
            respond(["success" => false, "message" => "No supported fields to update"], 400);
            return;
        }

        $values[] = $id;
        $pdo->beginTransaction();
        try {
            $update = $pdo->prepare("UPDATE complaints SET " . implode(", ", $updates) . " WHERE id = ?");
            $update->execute($values);
            if (isset($data["status"]) && $data["status"] !== $complaint["status"]) {
                $history = $pdo->prepare(
                    "INSERT INTO complaint_history (complaint_id, status, note, updated_by)
                     VALUES (?, ?, ?, ?)"
                );
                $history->execute([$id, $data["status"], trim($data["note"] ?? "Status updated"), $user["id"]]);
            }
            $pdo->commit();
            respond(["success" => true, "message" => "Complaint updated"]);
        } catch (Throwable $error) {
            $pdo->rollBack();
            throw $error;
        }
    }

    private function saveImage(): ?string
    {
        if (!isset($_FILES["image"]) || $_FILES["image"]["error"] === UPLOAD_ERR_NO_FILE) {
            return null;
        }

        $file = $_FILES["image"];
        if ($file["error"] !== UPLOAD_ERR_OK || $file["size"] > 5 * 1024 * 1024) {
            return null;
        }

        $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file["tmp_name"]);
        $extensions = ["image/jpeg" => "jpg", "image/png" => "png"];
        if (!isset($extensions[$mime])) {
            return null;
        }

        $directory = __DIR__ . "/../uploads";
        if (!is_dir($directory) && !mkdir($directory, 0750, true) && !is_dir($directory)) {
            return null;
        }

        $filename = bin2hex(random_bytes(16)) . "." . $extensions[$mime];
        if (!move_uploaded_file($file["tmp_name"], $directory . "/" . $filename)) {
            return null;
        }

        return "uploads/" . $filename;
    }
}