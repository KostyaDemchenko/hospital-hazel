<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? intval($_POST['id']) : null;
    $userId = intval($_POST['userId']);
    $appointmentId = intval($_POST['appointmentId']);
    $date = $_POST['date'];
    $time = $_POST['time'];
    $datetime = $date . ' ' . $time;

    if ($id) {
        $stmt = $mysqli->prepare("UPDATE user_appointments SET user_id = ?, appointment_id = ?, appointment_date = ? WHERE id = ?");
        $stmt->bind_param("iisi", $userId, $appointmentId, $datetime, $id);
    } else {
        $stmt = $mysqli->prepare("INSERT INTO user_appointments (user_id, appointment_id, appointment_date) VALUES (?, ?, ?)");
        $stmt->bind_param("iis", $userId, $appointmentId, $datetime);
    }

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to save appointment']);
    }

    $stmt->close();
}
