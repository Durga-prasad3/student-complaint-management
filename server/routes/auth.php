
<?php

require_once __DIR__ . "/../controllers/AuthController.php";

$authController = new AuthController();

$method = $_SERVER["REQUEST_METHOD"];

$action = $_GET["action"] ?? "";

if ($method === "POST" && $action === "register") {

    $authController->register();

} elseif ($method === "POST" && $action === "login") {

    $authController->login();

} elseif ($method === "GET" && $action === "me") {

    $authController->me();

} elseif ($method === "POST" && $action === "logout") {

    $authController->logout();

} else {

    http_response_code(404);

    echo json_encode([
        "success" => false,
        "message" => "Authentication route not found"
    ]);
}

