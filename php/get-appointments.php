<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

include 'db.php';

$sql = "
    SELECT ua.id, ua.user_id, u.username AS userName, ua.appointment_id, a.title, a.type,
    DATE_FORMAT(ua.appointment_date, '%Y-%m-%d') AS date,
    DATE_FORMAT(ua.appointment_date, '%H:%i') AS time
    FROM user_appointments ua
    JOIN users u ON ua.user_id = u.id
    JOIN appointments a ON ua.appointment_id = a.id
";

$result = $mysqli->query($sql);

$appointments = [];

while ($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}

echo json_encode($appointments);
