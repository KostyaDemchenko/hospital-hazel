<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

// Check if the user is authenticated and is an admin
session_start();
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

// Fetch total users
$resultTotal = $mysqli->query("SELECT COUNT(*) as total FROM users");
$totalUsers = $resultTotal->fetch_assoc()['total'];

// Fetch active users (example: users with last_login within 30 days)
$resultActive = $mysqli->query("SELECT COUNT(*) as active FROM users WHERE last_login >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
$activeUsers = $resultActive->fetch_assoc()['active'];

// Fetch new users this month
$resultNew = $mysqli->query("SELECT COUNT(*) as new_users FROM users WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())");
$newUsers = $resultNew->fetch_assoc()['new_users'];

echo json_encode([
    "totalUsers" => intval($totalUsers),
    "activeUsers" => intval($activeUsers),
    "newUsers" => intval($newUsers)
]);
