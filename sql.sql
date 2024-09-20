-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Сен 19 2024 г., 22:53
-- Версия сервера: 5.7.21-20-beget-5.7.21-20-1-log
-- Версия PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `u951762o_a25_tes`
--

-- --------------------------------------------------------

--
-- Структура таблицы `admins`
--
-- Создание: Сен 19 2024 г., 13:25
-- Последнее обновление: Сен 19 2024 г., 13:25
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`) VALUES
(1, 'admin', 'password123');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--
-- Создание: Сен 19 2024 г., 17:15
-- Последнее обновление: Сен 19 2024 г., 17:23
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `product_id`, `start_date`, `end_date`, `total_price`, `phone`, `name`, `email`, `created_at`) VALUES
(1, 1, '2024-09-01', '2024-09-02', '150.00', '+7 (891) 921-30', '', '', '2024-09-01 07:00:00'),
(2, 2, '2024-09-01', '2024-09-03', '300.00', '+7 (891) 921-31', '', '', '2024-09-01 08:00:00'),
(3, 3, '2024-09-01', '2024-09-05', '450.00', '+7 (891) 921-32', '', '', '2024-09-01 09:00:00'),
(4, 3, '2024-09-02', '2024-09-04', '200.00', '+7 (891) 921-33', '', '', '2024-09-02 07:00:00'),
(5, 3, '2024-09-02', '2024-09-06', '400.00', '+7 (891) 921-34', '', '', '2024-09-02 08:00:00'),
(6, 3, '2024-09-03', '2024-09-04', '100.00', '+7 (891) 921-35', '', '', '2024-09-03 07:00:00'),
(7, 4, '2024-09-04', '2024-09-07', '350.00', '+7 (891) 921-36', '', '', '2024-09-04 07:00:00'),
(8, 4, '2024-09-05', '2024-09-06', '200.00', '+7 (891) 921-37', '', '', '2024-09-05 07:00:00'),
(9, 4, '2024-09-05', '2024-09-08', '450.00', '+7 (891) 921-38', '', '', '2024-09-05 08:00:00'),
(10, 1, '2024-09-06', '2024-09-09', '500.00', '+7 (891) 921-39', '', '', '2024-09-06 07:00:00'),
(11, 1, '2024-09-08', '2024-09-10', '150.00', '+7 (891) 921-40', '', '', '2024-09-08 07:00:00'),
(12, 1, '2024-09-08', '2024-09-11', '300.00', '+7 (891) 921-41', '', '', '2024-09-08 08:00:00'),
(13, 4, '2024-09-09', '2024-09-10', '200.00', '+7 (891) 921-42', '', '', '2024-09-09 07:00:00'),
(14, 1, '2024-09-10', '2024-09-12', '400.00', '+7 (891) 921-43', '', '', '2024-09-10 07:00:00'),
(15, 3, '2024-09-12', '2024-09-13', '250.00', '+7 (891) 921-44', '', '', '2024-09-12 07:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--
-- Создание: Сен 19 2024 г., 12:25
-- Последнее обновление: Сен 19 2024 г., 19:53
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `price`) VALUES
(1, 'Модель A', '100.00'),
(2, 'Модель Y', '200.00'),
(3, 'Модель Q', '300.00'),
(5, 'Модель 4', '120.00');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;