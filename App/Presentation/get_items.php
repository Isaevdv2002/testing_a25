<?php
require '../Infrastructure/db.php'; 

$stmt = $conn->prepare("SELECT * FROM products ORDER BY name ASC");
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$stmt->close();
?>
