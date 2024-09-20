<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require '../Infrastructure/db.php'; 
require '../Application/DataAdapter.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../Infrastructure/PHPMailer/src/Exception.php';
require '../Infrastructure/PHPMailer/src/PHPMailer.php';
require '../Infrastructure/PHPMailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phone = $_POST['phone'];
    $name = $_POST['name']; 
    $email = $_POST['email']; 
    $productId = $_POST['productId'];
    $startDate = $_POST['startDate'];
    $endDate = $_POST['endDate'];
    $adapter = new DataAdapter($conn);
    $productData = $adapter->getProductData($productId);

    if (!$productData) {
        echo 'Ошибка: продукт не найден.';
        exit;
    }

    $productName = $productData['name'] ?? 'Неизвестно';
    $pricePerDay = $productData['price'] ?? 100; 

    $startDateTimestamp = strtotime($startDate);
    $endDateTimestamp = strtotime($endDate);
    $days = ($endDateTimestamp - $startDateTimestamp) / (60 * 60 * 24);

    if ($days <= 0) {
        echo 'Ошибка: неверные даты.';
        exit;
    }

    $totalPrice = $days * $pricePerDay;

    $stmt = $conn->prepare("INSERT INTO orders (product_id, start_date, end_date, total_price, phone, name, email) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issssss", $productId, $startDate, $endDate, $totalPrice, $phone, $name, $email);
    
    if (!$stmt->execute()) {
        echo 'Ошибка при записи заказа: ' . $stmt->error;
        exit;
    }
    $stmt->close();

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.mail.ru';
        $mail->SMTPAuth = true;
        $mail->Username = 'zayavka_s_sayta01@mail.ru';
        $mail->Password = 'htsXHaaK0ADrrhzaLUTs';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        $mail->CharSet = 'UTF-8';

        $mail->setFrom('zayavka_s_sayta01@mail.ru', 'CRM ensoez');
        $mail->addAddress('i.isaeww27@gmail.com'); 

        $mail->isHTML(true);
        $mail->Subject = 'Новая заявка на прокат летающей тарелки';
        $mail->Body    = "Новая заявка на прокат летающей тарелки:<br>
                          Модель: $productName<br>
                          Дата начала аренды: $startDate<br>
                          Дата окончания аренды: $endDate<br>
                          Цена: $totalPrice кредитов<br>
                          Номер телефона: $phone<br>
                          Имя: $name<br>
                          Email: $email";

        $mail->send();
        echo 'success';
    } catch (Exception $e) {
        echo 'Ошибка: ', $mail->ErrorInfo;
    }
}

?>