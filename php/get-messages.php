<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

session_start();

include 'db.php';

// Check if the user is authenticated and is an admin
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit();
}

// Optional: Verify if the user has admin privileges
$stmt = $mysqli->prepare("SELECT role FROM users WHERE id = ?");
$stmt->bind_param("i", $_SESSION['user_id']);
$stmt->execute();
$stmt->bind_result($role);
$stmt->fetch();
$stmt->close();

if ($role !== 'admin') {
    http_response_code(403);
    echo json_encode(["error" => "Forbidden"]);
    exit();
}

// Получение сообщений из базы данных
$stmt = $mysqli->prepare("SELECT id, name, email, phone, message, created_at FROM messages ORDER BY created_at DESC");

$stmt->execute();
$result = $stmt->get_result();
$messages = [];
while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}
$stmt->close();
$mysqli->close();

// Возвращаем сообщения в формате JSON
echo json_encode($messages);
