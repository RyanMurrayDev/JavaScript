function sendAjaxRequest(method, url,successCallback,data)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            successCallback(this);
        }
    };
    if( method === "GET")
    {
        if(data)
        {
            let query = new URLSearchParams(data).toString();
            //console.log("query: " + query);
            xhttp.open(method, url+"?"+query , true);
            xhttp.send();
        }
        else
        {
            xhttp.open(method,url,true);
            xhttp.send();
        }
    }
    else if(method === "POST")
    {
        xhttp.open(method,url,true);
        xhttp.send(data);
    }
}
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
let getQueryString = function ( field, url ) {
    let href = url ? url : window.location.href;
    let reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    let string = reg.exec(href);
    return string ? string[1] : null;
};

$(document).ready( function() {
    $("#allUsersButton").click();
    $('#insertScoreButton').prop('disabled', true);


    let username = getQueryString('username'); // returns 'username' from query string
    let godMode = false;
    let speedMode = false;

    let canvas = document.getElementById("canvas1");
    let ctx = canvas.getContext("2d");
    let ongoing = false;

    let birdImage = new Image();
    let mostRecent = "yellow";
    let backgroundImage = new Image();
    let foregroundImage = new Image();
    let topPipeImage = new Image();
    let bottomPipeImage = new Image();
    let fullTilt = new Image();

    birdImage.src = "img/birds/yellowBird.png";
    backgroundImage.src = "img/bg.png";
    foregroundImage.src = "img/fg.png";
    topPipeImage.src = "img/pipes/pipeNorth.png";
    bottomPipeImage.src = "img/pipes/pipeSouth.png";
    fullTilt.src = "img/pipes/full.png";


    let gap = 85;
    let constant;
    let birdX = 75;
    let birdY = 100;
    let gravity = 1.5;
    let score = 0;
    let pipe = [];
    let top;
    let bottom;

    let bird = new ImageSprite(birdX, birdY, 38, 26, birdImage);
    let background = new ImageSprite(0, 0, canvas.width, canvas.height, backgroundImage);
    let foreground = new ImageSprite(0, canvas.height - 112, canvas.width, 112, foregroundImage);

    // key down event
    $(window).keypress(function (e) {
        if (e.which === 32) {
            if (ongoing === true) {
                if(bird.y > 0){
                    bird.incrementY(-25);
                }
            } else {
                //starts new game if game is not currently ongoing
                ongoing = true;
                document.getElementById("againDiv").style.visibility = "hidden";
                pipe = [];
                let num = randomIntFromInterval(90, 300);
                let top = new ImageSprite(510, 0, 70, num, topPipeImage);
                bottomStart = canvas.height - foreground.height;
                bottom = new ImageSprite(510, num + gap, 70, bottomStart - num - gap, bottomPipeImage);
                pipe[0] = top;
                pipe[1] = bottom;
                score = 0;
                bird.x = 75;
                bird.y = 100;
                bird.draw(ctx);
                draw();
            }
        }
    });

    function draw() {

        background.draw(ctx);

        for (let i = 0; i < pipe.length; i++) {
            pipe[i].draw(ctx);
            //moves pipes over
            if (speedMode === false && godMode === false)
            {
                pipe[i].x--;
                pipe[i].x--;
            }
            if(speedMode===true)
            {
                pipe[i].x =  pipe[i].x-10;
                gravity = 2;
            }
            if(godMode===true)
            {
                pipe[i].x =  pipe[i].x-10;
                gravity = 2;
            }

            //adds new pipe every time the pipes x value gets to 470
            if (pipe[i].x === 470) {
                //two pipes have x of 470 but only want to add one new top and bottom image sprite
                if (i % 2 === 0) {
                    let num = randomIntFromInterval(90, 300);
                    let top = new ImageSprite(canvas.width, 0, 70, num, topPipeImage);
                    bottomStart = canvas.height - foreground.height;
                    bottom = new ImageSprite(canvas.width, num + gap, 70, bottomStart - num - gap, bottomPipeImage);
                    pipe.push(top);
                    pipe.push(bottom);
                }
            }

            // check for collision with pipes
            if (godMode === false) {
                if (pipe[i].intersects(bird)) {
                    ongoing = false;
                    console.log("hit pipe");
                }
            }
            //if god mode is true and intersects set pipe to next titled image
            else{
                if (pipe[i].intersects(bird)) {
                        if(i % 2 === 0)
                        {
                            pipe[i].img = fullTilt;
                            pipe[i].width = 200;
                            pipe[i].height = 70;
                        }
                        else{
                            pipe[i].img  = fullTilt;
                            pipe[i].width = 200;
                            pipe[i].height = 70;
                            pipe[i].y = canvas.height - 112 - 70;
                        }
                }
            }

            //check for collision with foreground
            if (bird.intersects(foreground)) {
                //console.log("intersects ground");
                ongoing = false;
            }
            //if pipe passes bird add to score
            if (pipe[i].x === 20) {
                //two pipes pass bird only want to add 1 to score
                if (i % 2 === 0) {
                    score++;
                }
            }
        }

        foreground.draw(ctx);
        bird.draw(ctx);
        bird.incrementY(gravity);

        ctx.fillStyle = "black";
        ctx.font = "20px Verdana";
        ctx.fillText("Score : " + score, 10, canvas.height - 20);

        if (ongoing === true) {
            requestAnimationFrame(draw);
            $('#insertScoreButton').prop('disabled', true);
        } else if (ongoing === false) {
            document.getElementById("againDiv").style.visibility = "visible";
            document.getElementById("scoreInForm").value = score;
            // add score to form then submit form
            if (score !== 0 && godMode === false) {
                $('#insertScoreButton').prop('disabled', false);
                $("#insertScoreButton").click(function (evt) {
                    let form1 = document.getElementById("insertScoreForm");
                    let data = new FormData(form1);
                    $('#insertScoreButton').prop('disabled', true);
                    sendAjaxRequest("POST", "controllers/insertScore.php",
                        function (xhttp) {
                            let string = xhttp.responseText;
                            console.log("ajax returned string" + string);
                        }, data);
                    // refreshes display of all high scores
                    $("#allUsersButton").click();
                });
            }
        }
    }

        draw();


        $("#yellowdiv").click(function (evt) {
            birdImage.src = "img/birds/yellowBird.png";
            bird.img = birdImage;
            mostRecent="yellow";
        });
        $("#reddiv").click(function (evt) {
            birdImage.src = "img/birds/redBird.png";
            bird.img = birdImage;
            mostRecent="red";
        });
        $("#purplediv").click(function (evt) {
            birdImage.src = "img/birds/purpleBird.png";
            bird.img = birdImage;
            mostRecent="purple";
        });
        $("#greendiv").click(function (evt) {
            birdImage.src = "img/birds/greenBird.PNG";
            bird.img = birdImage;
            mostRecent="green";
        });
        $("#whitediv").click(function (evt) {
            birdImage.src = "img/birds/whiteBird.png";
            bird.img = birdImage;
            mostRecent="white";
        });
        $("#byUsernameDiv").click(function (evt) {
            document.getElementById("form2").style.visibility = "visible";
        });
        $("#allUsersDiv").click(function (evt) {
            resetCheats();
            document.getElementById("form2").style.visibility = "hidden";
            sendAjaxRequest("POST", "controllers/getTopScores.php",
                function (xhttp) {
                    let string = xhttp.responseText;
                    let array = string.split("~");
                    for (let i in array) {
                        //console.log(array[i]);
                        $("#td" + i).html(array[i]);
                    }
                });
        });
        $("#searchUsername").click(function (evt) {
            let form1 = document.getElementById("form2");
            let data = new FormData(form1);
            let send = true;
            for (let entry of data.entries()) {
                resetCheats();
                if (entry[1] === "god" || entry[1] === "God") {
                    //console.log("in god Mode");
                    send = false;
                    godMode = true;
                    document.getElementById("godMode").style.visibility = "visible";
                    document.getElementById("speedMode").style.visibility = "hidden";
                    bird.height = 140;
                    bird.width = 160;
                    birdImage.src = "img/birds/colorBird.png";
                    bird.img = birdImage;
                }
                else if (entry[1] === "rip" || entry[1] === "flash") {
                    //console.log("in speed Mode");
                    send = false;
                    speedMode = true;
                    document.getElementById("speedMode").style.visibility = "visible";
                    document.getElementById("godMode").style.visibility = "hidden";
                }else {
                resetCheats();
                }
            }
            if (send === true) {
                sendAjaxRequest("POST", "controllers/getTopScoresGivenUsername.php",
                    function (xhttp) {
                        let string = xhttp.responseText;
                        for (let w = 1; w < 30; w++) {
                            $("#td" + w).html("");
                        }

                        let array = string.split("~");
                        //console.log(array);
                        for (let i in array) {
                            //console.log(array[i]);
                            $("#td" + i).html(array[i]);
                        }
                    }, data);
            }
        });

function resetCheats(){
    godMode = false;
    speedMode = false;
    gravity = 1.5;
    bird.height = 26;
    bird.width = 38;
    document.getElementById("godMode").style.visibility = "hidden";
    document.getElementById("speedMode").style.visibility = "hidden";
    // sets bird image back to what it was before cheat code was entered
    if(mostRecent === "red")
    {
        birdImage.src = "img/birds/redBird.jpg";
        bird.img = birdImage;
    }
    else if(mostRecent === "purple")
    {
        birdImage.src = "img/birds/purpleBird.png";
        bird.img = birdImage;
    }
    else if(mostRecent === "green")
    {
        birdImage.src = "img/birds/greenBird.PNG";
        bird.img = birdImage;
    }
    else if(mostRecent === "white")
    {
        birdImage.src = "img/birds/whiteBird.png";
        bird.img = birdImage;
    }
    else
    {
        birdImage.src = "img/birds/yellowBird.png";
        bird.img = birdImage;
    }
}


});