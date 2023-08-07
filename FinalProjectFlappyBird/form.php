<?php
require_once("validation/validation.php");
$usernameerr = "";
if(isset($_GET["username"]))
{
    $username = sanitizer($_GET["username"]);
}
if(isset($_GET["usernameerr"]))
{
    $usernameerr = sanitizer($_GET["usernameerr"]);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Form</title>
    <link href="css/formstyles.css" rel="stylesheet" type="text/css" />
</head>
<body>
<h1>Flappy Bird</h1>
<div id="div1">
<form id="form1" name="form1" method="get" action="login_controller.php">
    <label>Username: </label><br /><br />
    <input type="text" name="username" placeholder="Enter username" /><br />
    <span class="error"><?php echo $usernameerr ?></span><br />
    <input type="submit" id="submitButton" name="submitButton" value="Play"/>
</form>
    <div id="parent">
    <div id="yellowbird" class="bird">
        <img src="img/birds/yellowBird.png" alt="yellow bird" width="38px" height="26px" />
    </div>
    <div id="redbird" class="bird">
        <img src="img/birds/redBird.png" alt="red bird" width="38px" height="26px" />
    </div>
    <div id="purplebird" class="bird">
        <img src="img/birds/purpleBird.png" alt="purple bird" width="38px" height="26px" />
    </div>
    <div id="greenbird" class="bird">
        <img src="img/birds/greenBird.png" alt="green bird" width="38px" height="26px" />
    </div>
    <div id="whitebird" class="bird">
        <img src="img/birds/whiteBird.png" alt="white bird" width="38px" height="26px" />
    </div>
        <div id="colorbird" class="bird">
            <img src="img/birds/colorBird.png" alt="color bird" width="38px" height="26px" />
        </div>
    </div>
</div>
</body>
</html>