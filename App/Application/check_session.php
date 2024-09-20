<?php
session_start();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    echo 'loggedin';
} else {
    echo 'notloggedin';
}
?>
