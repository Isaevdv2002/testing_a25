<?php
require '../Infrastructure/db.php';

class DataAdapter {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    // Метод для получения данных о продукте
    public function getProductData($productId) {
        $stmt = $this->conn->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->bind_param("i", $productId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        } else {
            return null;
        }
    }

    // Метод для получения прайса продукта
    public function getPriceByProductId($productId) {
        $data = $this->getProductData($productId);
        return $data ? $data['price'] : 0;
    }
}
?>
