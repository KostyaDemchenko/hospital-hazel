<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_start();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_SESSION['user_id']) && $_SESSION['role'] === 'admin') {
        http_response_code(200);
        echo json_encode(["message" => "Admin authenticated"]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method"]);
}
