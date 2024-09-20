<?php
require '../Infrastructure/db.php'; 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['itemName'];
    $price = $_POST['itemPrice'];

    $stmt = $conn->prepare("INSERT INTO products (name, price) VALUES (?, ?)");
    $stmt->bind_param('sd', $name, $price);

    if ($stmt->execute()) {
        echo 'success';
    } else {
        echo 'error';
    }

    $stmt->close();
}
?>
