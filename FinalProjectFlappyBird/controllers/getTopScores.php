<?php

require_once("../Models/Score.php");

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

$array = Score::getTopTenScores($conn);
if($array == [])
{
    echo "No scores in database";
}
else{
    //echo json_encode($array);
    $size= sizeof($array);
    for($x=0; $x<$size;$x++)
    {
        echo  $array[$x]->username . "~" . $array[$x]->score ."~". $array[$x]->timestamp . "~";
    }
}