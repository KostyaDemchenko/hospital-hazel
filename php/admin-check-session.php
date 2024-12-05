<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Разрешить запросы с вашего фронтенда
header("Access-Control-Allow-Credentials: true"); // Разрешить отправку cookie
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Разрешенные методы
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With"); // Разрешенные заголовки

session_start();

// Проверяем, существует ли сессия
if (isset($_SESSION['user_id']) && $_SESSION['role'] === 'admin') {
    // Если сессия существует, возвращаем успех
    http_response_code(200);
    echo json_encode(["message" => "Admin session active"]);
} else {
    // Если сессия не существует
    http_response_code(401);
    echo json_encode(["error" => "Not authenticated"]);
}
?>
