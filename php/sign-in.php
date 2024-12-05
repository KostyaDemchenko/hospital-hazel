<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = [];

    $username = trim($_POST['username']);
    $password = $_POST['password'];

    if (empty($username) || empty($password)) {
        http_response_code(400);
        echo json_encode(["error" => "Username and password are required"]);
        exit();
    }

    $stmt = $mysqli->prepare("SELECT id, password, role FROM users WHERE username = ?");
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["error" => "Database query preparation failed"]);
        exit();
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        http_response_code(401);
        $errors['username'] = "User not found";
        echo json_encode(["errors" => $errors]);
        $stmt->close();
        exit();
    }

    $stmt->bind_result($id, $hashed_password, $role);
    $stmt->fetch();

    if (password_verify($password, $hashed_password)) {
        $_SESSION['user_id'] = $id;
        $_SESSION['role'] = $role;
        http_response_code(200);
        echo json_encode(["message" => "Login successful"]);
    } else {
        http_response_code(401);
        $errors['password'] = "Invalid password";
        echo json_encode(["errors" => $errors]);
    }

    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method"]);
}
?>
