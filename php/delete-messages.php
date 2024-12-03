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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем и проверяем ID сообщения
    $messageId = isset($_POST['id']) ? intval($_POST['id']) : 0;

    if ($messageId <= 0) {
        http_response_code(400);
        echo json_encode(["error" => "Неверный ID сообщения."]);
        exit();
    }

    // Удаляем сообщение из базы данных
    $stmt = $mysqli->prepare("DELETE FROM messages WHERE id = ?");
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["error" => "Ошибка базы данных: Не удалось подготовить запрос."]);
        exit();
    }

    $stmt->bind_param("i", $messageId);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            http_response_code(200);
            echo json_encode(["success" => "Сообщение успешно удалено."]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Сообщение не найдено."]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Ошибка базы данных: Не удалось удалить сообщение."]);
    }

    $stmt->close();
    $mysqli->close();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Метод не разрешен."]);
}
