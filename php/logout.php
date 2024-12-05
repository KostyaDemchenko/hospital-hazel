<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Очистка всех переменных сессии
    $_SESSION = [];

    // Уничтожение сессии
    session_destroy();

    http_response_code(200);
    echo json_encode(["message" => "Logged out successfully"]);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method"]);
}
?>
