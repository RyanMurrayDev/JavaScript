<?php
require_once("validation/validation.php");


$username = "";
$usernameerr = "";
$errorList = [];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $username = sanitizer($_GET["username"]);


    if (empty($username)) {
        $usernameerr = "Please enter a username";
        $errorList["usernameerr"] = $usernameerr;
    } else {
        if ($username == "god" || $username == "God") {
            $usernameerr = "invalid username";
            $errorList["usernameerr"] = $usernameerr;
        }
    }
}

if($errorList != [])
{
    $path = getCWDPath();
    $query = buildQueryString($errorList);
    //var_dump($errorList);
    echo $query;
    header("Location: $path/form.php" .$query);
}
else{
    $path = getCWDPath();
    $query = "?username=" . $username;

    header("Location: $path/view.php" .$query);
}

