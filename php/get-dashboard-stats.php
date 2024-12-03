<?php
// get-dashboard-stats.php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");

include 'db.php';

// Get total users
$userResult = $mysqli->query("SELECT COUNT(*) AS total_users FROM users");
$userData = $userResult->fetch_assoc();

// Get total appointments
$appointmentResult = $mysqli->query("SELECT COUNT(*) AS total_appointments FROM user_appointments");
$appointmentData = $appointmentResult->fetch_assoc();

// Get total messages
$messageResult = $mysqli->query("SELECT COUNT(*) AS total_messages FROM messages");
$messageData = $messageResult->fetch_assoc();

// Prepare the response
$response = [
    'total_users' => $userData['total_users'],
    'total_appointments' => $appointmentData['total_appointments'],
    'total_messages' => $messageData['total_messages']
];

// Return the response as JSON
echo json_encode($response);

$mysqli->close();
