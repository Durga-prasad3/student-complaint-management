
<?php

header("Content-Type: application/json");
$origin = $_SERVER["HTTP_ORIGIN"] ?? "";
$allowedOrigins = array_filter(array_map("trim", explode(",", getenv("CORS_ORIGINS") ?: "http://localhost:5173")));

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin");
}

header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$path = trim($_GET["path"] ?? "", "/");

try {
    if ($path === "auth") {
        require_once __DIR__ . "/routes/auth.php";
    } elseif ($path === "complaints") {
        require_once __DIR__ . "/routes/complaints.php";
    } elseif ($path === "health") {
        echo json_encode(["success" => true, "message" => "SmartCampus API is running"]);
    } else {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "API route not found"]);
    }
} catch (Throwable $error) {
    error_log($error->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "An unexpected server error occurred"]);
}


