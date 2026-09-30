<?php

require_once __DIR__ . "/../controllers/ComplaintController.php";

$controller = new ComplaintController();
$method = $_SERVER["REQUEST_METHOD"];
$id = isset($_GET["id"]) ? filter_var($_GET["id"], FILTER_VALIDATE_INT) : null;

if ($id !== null && $id === false) {
    respond(["success" => false, "message" => "Invalid complaint id"], 400);
} elseif ($method === "GET" && $id !== null) {
    $controller->show($id);
} elseif ($method === "GET") {
    $controller->index();
} elseif ($method === "POST" && $id === null) {
    $controller->create();
} elseif (in_array($method, ["PATCH", "PUT"], true) && $id !== null) {
    $controller->update($id);
} else {
    respond(["success" => false, "message" => "Complaint route not found"], 404);
}