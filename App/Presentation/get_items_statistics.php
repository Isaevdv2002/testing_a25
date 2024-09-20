<?php
require '../Infrastructure/db.php'; 

try {
    $stmt = $conn->prepare("SELECT p.name, COUNT(o.product_id) as rentals FROM orders o JOIN products p ON o.product_id = p.id GROUP BY p.name");
    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
$stmt->close();
?>
