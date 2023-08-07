<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Flappy Bird</title>
    <link href='https://fonts.googleapis.com/css?family=Atma' rel='stylesheet'>
    <link href = "css/mystyles.css" rel="stylesheet" type="text/css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/sprites.js"></script>
    <script src="js/myscripts.js"></script>
</head>
<body>
<h1>Flappy Bird</h1>
<!-- button to get high scores when page originally loads  covered by a div-->
<button type="button" id="allUsersButton" onclick="myFunction()">s</button>
<div id="coverButton"></div>
<div id="usernameDiv">Signed in as: <?php  require_once("validation/validation.php");
    $username = sanitizer($_GET["username"]);
    echo $username; ?>
</div>
<div id="signout">
<form id="form5" name="form5" method="get" action="signout_controller.php">
    <input type="submit" name="signoutButton" value="Sign Out"/>
</form></div>
<div id="againDiv">Click space bar to play</div>
<canvas id="canvas1" width="700" height="512"></canvas>
<section id="section1">
    <ul>
        <li><div class="dropdown">
                <button  id="shapes" class="dropbtn">Bird Color</button>
                <div class="dropdown-content">
                    <div  id="yellowdiv">Yellow</div>
                    <div id="reddiv">Red</div>
                    <div id="purplediv">Purple</div>
                    <div id="greendiv">Green</div>
                    <div id="whitediv">White</div>
                </div>
            </div></li>
        <li><div class="dropdown">
                <button  id="shapes" class="dropbtn">Search Scores For</button>
                <div class="dropdown-content">
                    <div  id="allUsersDiv">All Users</div>
                    <div id="byUsernameDiv">By Username</div>
                </div>
            </div></li>
    </ul>
    <form id="form2" name="form2">
        <label>Username: </label>
        <input type="text" name="username" placeholder="Enter username" />
        <button type="button" value="Send" name="searchUsername" id="searchUsername">Search</button>
    </form>
    <div id="godMode">
        God Mode Activated!!!
    </div>
    <div id="speedMode">
        You asked for it!!!
    </div>
<h2>Top Scores</h2>
   <table>
        <tr>
            <th>Username</th>
            <th>Score</th>
            <th>Timestamp</th>
        </tr>
        <tr>
            <td id="td0"></td>
            <td id="td1"></td>
            <td id="td2"></td>
        </tr>
       <tr>
           <td id="td3"></td>
           <td id="td4"></td>
           <td id="td5"></td>
       </tr>
       <tr>
           <td id="td6"></td>
           <td id="td7"></td>
           <td id="td8"></td>
       </tr>
       <tr>
           <td id="td9"></td>
           <td id="td10"></td>
           <td id="td11"></td>
       </tr>
       <tr>
           <td id="td12"></td>
           <td id="td13"></td>
           <td id="td14"></td>
       </tr>
       <tr>
           <td id="td15"></td>
           <td id="td16"></td>
           <td id="td17"></td>
       </tr>
       <tr>
           <td id="td18"></td>
           <td id="td19"></td>
           <td id="td20"></td>
       </tr>
       <tr>
           <td id="td21"></td>
           <td id="td22"></td>
           <td id="td23"></td>
       </tr>
       <tr>
           <td id="td24"></td>
           <td id="td25"></td>
           <td id="td26"></td>
       </tr>
       <tr>
           <td id="td27"></td>
           <td id="td28"></td>
           <td id="td29"></td>
       </tr>
    </table>
</section>
<div id="submitScoreDiv">
    <form id="insertScoreForm" name="insertScoreForm" method="post">
        <label>Username: </label>
        <input type="text" name="username" value="<?php require_once("validation/validation.php");
    $username = sanitizer($_GET["username"]); echo $username ?>" readonly />
        <label>Score: </label>
        <input type="text" name="scoreInForm" id="scoreInForm" readonly />
        <button type="button" value="Send" id="insertScoreButton" name="insertScoreButton">Submit Score</button>
    </form></div>

<script>
    function myFunction(){
        sendAjaxRequest("POST","controllers/getTopScores.php",
            function(xhttp){
                let string = xhttp.responseText;
                console.log(string);
                let array = string.split("~");
                console.log(array);
                for (let i in array) {
                    //console.log(array[i]);
                    $("#td"+i).html(array[i]);
                }
            });
    }
</script>
</body>
</html>