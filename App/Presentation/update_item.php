<?php
require '../Infrastructure/db.php'; 

$id = $_POST['id'];
$name = $_POST['name'];
$price = $_POST['price'];

$stmt = $conn->prepare("UPDATE products SET name = ?, price = ? WHERE id = ?");
$stmt->bind_param("sdi", $name, $price, $id);

if ($stmt->execute()) {
    echo 'success';
} else {
    echo 'error';
}

$stmt->close();
?>
