<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

$result = $mysqli->query("SELECT * FROM appointments");

$appointmentTypes = [];

while ($row = $result->fetch_assoc()) {
    $appointmentTypes[] = $row;
}

echo json_encode($appointmentTypes);
