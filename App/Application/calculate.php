<?php
require 'DataAdapter.php'; 
require '../Infrastructure/db.php'; 


$adapter = new DataAdapter($conn);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $productId = $_POST['productId'];
    $startDate = $_POST['startDate'];
    $endDate = $_POST['endDate'];

    // Расчет количества дней аренды
    $start = new DateTime($startDate);
    $end = new DateTime($endDate);
    $interval = $start->diff($end);
    $days = $interval->days;

    // Получение прайса
    $pricePerDay = $adapter->getPriceByProductId($productId);
    $totalPriceRUB = $pricePerDay * $days;

    // Получение курса валют
    $exchangeRateUrl = 'https://www.cbr-xml-daily.ru/daily_json.js';
    $exchangeRateData = file_get_contents($exchangeRateUrl);
    $exchangeRateJson = json_decode($exchangeRateData, true);
    $rateRUBtoCNY = $exchangeRateJson['Valute']['CNY']['Value'];

    // Расчет стоимости в юанях
    $totalPriceCNY = $totalPriceRUB / $rateRUBtoCNY;

    // Возвращаем результат
    echo json_encode([
        'priceRUB' => number_format($totalPriceRUB, 2, '.', ','),
        'priceCNY' => number_format($totalPriceCNY, 2, '.', ',')
    ]);
}
?>
