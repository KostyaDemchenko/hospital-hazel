<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_start();

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = [];

    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $mysqli->prepare("SELECT id, password, role FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        http_response_code(401);
        $errors['username'] = "Admin not found";
        echo json_encode(["errors" => $errors]);
        $stmt->close();
        exit();
    }

    $stmt->bind_result($id, $hashed_password, $role);
    $stmt->fetch();

    if ($role !== 'admin') {
        http_response_code(401);
        $errors['username'] = "You are not an admin";
        echo json_encode(["errors" => $errors]);
    } else if (password_verify($password, $hashed_password)) {
        $_SESSION['user_id'] = $id;
        $_SESSION['role'] = 'admin';
        http_response_code(200);
        echo json_encode(["message" => "Admin login successful"]);
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
