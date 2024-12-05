<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_start();

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = [];

    // Получение и очистка данных
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $password = $_POST['password'];
    $role = 'user'; // Default role
    $user_photo = isset($_POST['user_photo']) && !empty($_POST['user_photo']) ? trim($_POST['user_photo']) : null;

    // Проверка имени пользователя
    if (empty($username)) {
        $errors['username'] = "Username is required";
    }

    // Проверка email
    if (empty($email)) {
        $errors['email'] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format";
    } else {
        // Проверка уникальности email
        $stmt = $mysqli->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $errors['email'] = "Email already exists";
        }
        $stmt->close();
    }

    // Проверка телефона
    if (empty($phone)) {
        $errors['phone'] = "Phone number is required";
    } elseif (!preg_match("/^\+?[0-9]{10,15}$/", $phone)) {
        $errors['phone'] = "Invalid phone number format. It should contain only digits and be between 10 to 15 characters long.";
    }

    // Проверка пароля
    if (empty($password)) {
        $errors['password'] = "Password is required";
    } elseif (strlen($password) < 6) {
        $errors['password'] = "Password must be at least 6 characters";
    } elseif (!preg_match('/[A-Z]/', $password)) {
        $errors['password'] = "Password must contain at least one uppercase letter";
    } elseif (!preg_match('/[a-z]/', $password)) {
        $errors['password'] = "Password must contain at least one lowercase letter";
    } elseif (!preg_match('/[0-9]/', $password)) {
        $errors['password'] = "Password must contain at least one number";
    } elseif (!preg_match('/[\W]/', $password)) {
        $errors['password'] = "Password must contain at least one special character";
    }

    // Если есть ошибки, возвращаем их клиенту
    if (!empty($errors)) {
        http_response_code(422); // Unprocessable Entity
        echo json_encode(["errors" => $errors]);
        exit();
    }

    // Хеширование пароля
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Вставка данных в базу
    $stmt = $mysqli->prepare("INSERT INTO users (username, email, phone, password, role, user_photo) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $username, $email, $phone, $hashed_password, $role, $user_photo);

    if ($stmt->execute()) {
        $_SESSION['user_id'] = $stmt->insert_id;
        http_response_code(200);
        echo json_encode(["message" => "Registration successful"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Server error"]);
    }

    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method"]);
}
