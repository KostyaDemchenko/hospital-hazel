<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Update with your frontend URL
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

include 'db.php'; // Ensure this file connects to your MySQL database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize POST data
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Basic validation
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        http_response_code(400);
        echo json_encode(["error" => "All fields are required."]);
        exit();
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid email format."]);
        exit();
    }

    // Optional: Validate phone number format (basic example)
    if (!preg_match('/^\+?\d{7,15}$/', $phone)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid phone number format."]);
        exit();
    }

    // Prepare and bind
    $stmt = $mysqli->prepare("INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)");
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: Unable to prepare statement."]);
        exit();
    }

    $stmt->bind_param("ssss", $name, $email, $phone, $message);

    // Execute the statement
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["success" => "Message sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Database error: Unable to send message."]);
    }

    // Close the statement and connection
    $stmt->close();
    $mysqli->close();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
}
