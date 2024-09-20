<?php
require '../Infrastructure/db.php'; 

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Подготовка SQL-запроса
    $stmt = $conn->prepare("SELECT * FROM admins WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Вход успешен, создаем сессию
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        echo 'success';
    } else {
        // Вход неудачен
        echo 'error';
    }
}
?>