<?php
require '../Infrastructure/db.php'; 

$stmt = $conn->prepare("SELECT o.id, p.name AS product_name, o.start_date, o.end_date, o.total_price, o.phone, o.created_at 
                         FROM orders o 
                         JOIN products p ON o.product_id = p.id");
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['id']}</td>
                <td>{$row['product_name']}</td>
                <td>{$row['start_date']}</td>
                <td>{$row['end_date']}</td>
                <td>{$row['total_price']}</td>
                <td>{$row['phone']}</td>
                <td>{$row['created_at']}</td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='7'>Нет заказов</td></tr>";
}

$stmt->close();
$conn->close();

?>
