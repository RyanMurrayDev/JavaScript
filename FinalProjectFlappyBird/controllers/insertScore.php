<?php
require_once("../models/Score.php");

//$password = "Baseball1834!";
$password = "dennisiscool";
$conn = new mysqli("localhost","root",
    $password,"flappy_bird",3306);
if($conn->connect_error)
{
    die("Connection Failed: " .
        $conn->connect_error);
}
//echo "Connection successful" . "<br />";
//var_dump($_POST);
$username = $_POST["username"];
$score = $_POST["scoreInForm"];
echo $score . $username;
$insert = Score::insertScore($conn,$username,$score);
if(is_numeric($insert))
{
    echo "Inserted Successfully";
}
else{
    echo"Insert Failed";
}



