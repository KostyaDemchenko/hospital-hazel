<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db.php';

// Проверка аутентификации
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit();
}

$user_id = $_SESSION['user_id'];

// Получение информации о пользователе
$stmt = $mysqli->prepare("SELECT username, email, phone, user_photo FROM users WHERE id = ?");
if ($stmt === false) {
    http_response_code(500);
    echo json_encode(["error" => "Database query preparation failed"]);
    exit();
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($username, $email, $phone, $user_photo);
if (!$stmt->fetch()) {
    http_response_code(404);
    echo json_encode(["error" => "User not found"]);
    $stmt->close();
    exit();
}
$stmt->close();

// Получение аппоинтментов пользователя
$stmt = $mysqli->prepare("
    SELECT a.title, a.type, ua.appointment_date
    FROM user_appointments ua
    JOIN appointments a ON ua.appointment_id = a.id
    WHERE ua.user_id = ?
    ORDER BY ua.appointment_date
");

if ($stmt === false) {
    http_response_code(500);
    echo json_encode(["error" => "Database query preparation failed"]);
    exit();
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$appointments = [];
while ($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}
$stmt->close();

// Ответ с информацией о пользователе и аппоинтментах
echo json_encode([
    "username" => $username,
    "email" => $email,
    "phone" => $phone,
    "user_photo" => $user_photo, // URL изображения профиля
    "appointments" => $appointments
]);
?>
