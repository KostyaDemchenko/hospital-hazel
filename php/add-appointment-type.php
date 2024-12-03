<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$title = $data['title'];
$type = $data['type'];

$stmt = $mysqli->prepare("INSERT INTO appointments (title, type) VALUES (?, ?)");
$stmt->bind_param("ss", $title, $type);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "id" => $stmt->insert_id]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$mysqli->close();
