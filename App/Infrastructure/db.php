<?php
$servername = "localhost";
$username = "u951762o_a25_tes";
$password = "%LE0hu3J0JPw";
$dbname = "u951762o_a25_tes";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
?>
