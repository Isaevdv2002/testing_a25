<?php
require '../Infrastructure/db.php'; 

$stmt = $conn->prepare("SELECT DATE(created_at) AS date, COUNT(*) AS count
                         FROM orders
                         GROUP BY DATE(created_at)
                         ORDER BY DATE(created_at)");
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$stmt->close();
?>
