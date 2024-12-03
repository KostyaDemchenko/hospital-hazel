<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit();
}

include 'db.php';

$user_id = $_SESSION['user_id'];

// Получение информации о пользователе
$stmt = $mysqli->prepare("SELECT username, email, phone FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($username, $email, $phone);
$stmt->fetch();
$stmt->close();

// Получение аппоинтментов пользователя
$stmt = $mysqli->prepare("
    SELECT a.title, a.type, ua.appointment_date
    FROM user_appointments ua
    JOIN appointments a ON ua.appointment_id = a.id
    WHERE ua.user_id = ?
    ORDER BY ua.appointment_date
");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$appointments = [];
while ($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}
$stmt->close();

echo json_encode([
    "username" => $username,
    "email" => $email,
    "phone" => $phone,
    "appointments" => $appointments
]);
