<?php
$mysqli = new mysqli("mysql", "root", "rootpassword", "kidohelp");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
