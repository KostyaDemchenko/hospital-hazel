<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

session_start(); // Сессия должна стартовать до выполнения любых операций

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = [];

    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $mysqli->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        http_response_code(401);
        $errors['email'] = "User not found";
        echo json_encode(["errors" => $errors]);
        $stmt->close();
        exit();
    }

    $stmt->bind_result($id, $hashed_password);
    $stmt->fetch();

    if (password_verify($password, $hashed_password)) {
        $_SESSION['user_id'] = $id;
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
    echo json_encode(["errors" => "Invalid request method"]);
}
