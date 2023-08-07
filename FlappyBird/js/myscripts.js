let app = angular.module("myApp", ["ngRoute"]);
let username = "";
const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.config(["$routeProvider",
    function ($routeProvider, $routeParams) {
        $routeProvider
            .when("/", {
                templateUrl: "./templates/main.html",
                controller: "mainCtrl"
            })
            .when("/back", {
                templateUrl: "./templates/main.html",
                controller: "mainCtrl"
            })
            .when("/login", {
                templateUrl: "./templates/login.html",
                controller: "loginCtrl"
            })
            .when("/register", {
                templateUrl: "./templates/register.html",
                controller: "registerCtrl"
            })
            .when("/scores", {
                templateUrl: "./templates/scores.html",
                controller: "scoresCtrl"
            })
            .when("/game", {
                templateUrl: "./templates/game.html",
                controller: "gameCtrl"
            })
            .when("/admin", {
                templateUrl: "./templates/adminGame.html",
                controller: "adminGameCtrl"
            })
    }
]);
app.controller('mainCtrl', function ($scope, $location) {
    $scope.play = function () {
        console.log("click play");
        if ($scope.username == null) {
            console.log("no username");
            $scope.err = "Please enter a username";
        } else {
            $scope.err = "";
            username = $scope.username;
            console.log("Username is " + $scope.username);
            $location.path("/game");
        }
    };
});
app.controller('gameCtrl', function ($scope, $http) {
    $scope.username = username;
    /*//   WHEN USING CLASS
     let canvas = document.getElementById("canvas1");
    let ctx = canvas.getContext("2d");
    let insertScore = false;
    let alreadyInserted = false;
    let birdImage = new Image();
    birdImage.src = "img/birds/yellowBird.png";
    let northPipe = new Image();
    northPipe.src = "img/pipes/pipeNorth.png";
    let southPipe = new Image();
    southPipe.src = "img/pipes/pipeSouth.png";
    let foreground = new Image();
    foreground.src = "img/backgrounds/fg.png";
    let background = new Image();
    background.src = "img/backgrounds/bg.png";
    let game = new FlappyBird(canvas, ctx, birdImage, northPipe, southPipe, foreground, background);
    $(window).keypress(function (e) {
        if (e.which === 32) {
            console.log("Space bar clicked");
            game.onKeyDown(canvas);

        }
    });

   setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec

    function onTimerTick() {
        game.update(canvas,ctx);
        if(game.isOngoing()){
            game.draw(canvas,ctx);
        }
    }
    window.requestAnimationFrame(gameLoop); */

    let canvas = document.getElementById("canvas1");
    let ctx = canvas.getContext("2d");
    let ongoing = false;

    let birdImage = new Image();
    let backgroundImage = new Image();
    let foregroundImage = new Image();
    let topPipeImage = new Image();
    let bottomPipeImage = new Image();

    birdImage.src = "img/birds/yellowBird.png";
    backgroundImage.src = "img/backgrounds/bg.png";
    foregroundImage.src = "img/backgrounds/fg.png";
    topPipeImage.src = "img/pipes/pipeSouth.png";
    bottomPipeImage.src = "img/pipes/pipeNorth.png";


    let gap = canvas.height/6;
    let constant;
    let birdX = canvas.width/9.33;
    let birdY = canvas.height/5.2;
    let gravity = canvas.height/341.33;
    let score = 0;
    let pipe = [];
    let top;
    let bottom;
    let bottomStart;
    //variable to make pipes move at a speed that considers the canvas size
    let bigScreen = false;
    if(canvas.width>500)
    {
        bigScreen = true;
    }

    let bird = new ImageSprite(birdX, birdY, canvas.width/18.421, canvas.height/19.6923, birdImage);
    let background = new ImageSprite(0, 0, canvas.width, canvas.height, backgroundImage);
    let foreground = new ImageSprite(0, canvas.height/1.28, canvas.width, canvas.height-canvas.height/1.28, foregroundImage);


    // key down event
    $scope.jump =(function () {
            if (ongoing === true) {
                if (bird.y > 0) {
                    bird.incrementY(-canvas.height/20.48);
                }
            } else {
                console.log("restarted");
                //starts new game if game is not currently ongoing
                $scope.err = "";
                pipe = [];
                let num = randomIntFromInterval(Math.round(canvas.height/5.6889), Math.round(canvas.height/1.706));
                let top = new ImageSprite(canvas.width, 0, canvas.width/10, num, topPipeImage);
                bottomStart = canvas.height - foreground.height;
                bottom = new ImageSprite(canvas.width, num + gap, canvas.width/10, bottomStart - num - gap, bottomPipeImage);
                pipe[0] = top;
                pipe[1] = bottom;
                score = 0;
                bird.x = canvas.width/9.33;
                bird.y = canvas.height/5.2;
                bird.draw(ctx);
                ongoing = true;
                draw();
            }
    });

   function draw() {
        background.draw(ctx);

        for (let i = 0; i < pipe.length; i++) {
            pipe[i].draw(ctx);
            //moves pipes over
            pipe[i].x--;
            if(bigScreen){
                pipe[i].x--;
            }



            //adds new pipe every time the pipes x value gets to canvas.width/1.8
            if(bigScreen){
            if (pipe[i].x === Math.round(canvas.width/1.8) || pipe[i].x === Math.round(canvas.width/1.8)+1) {
                //two pipes have x of value but only want to add one new top and bottom image sprite
                if (i % 2 === 0) {
                    let num = randomIntFromInterval(Math.round(canvas.height/5.6889), Math.round(canvas.height/1.706));
                    let top = new ImageSprite(canvas.width, 0, canvas.width/10, num, topPipeImage);
                    bottomStart = canvas.height - foreground.height;
                    bottom = new ImageSprite(canvas.width, num + gap, canvas.width/10, bottomStart - num - gap, bottomPipeImage);
                    pipe.push(top);
                    pipe.push(bottom);
                }
            }
            }
            else{
                if (pipe[i].x === Math.round(canvas.width/1.8)) {
                    //two pipes have x of value but only want to add one new top and bottom image sprite
                    if (i % 2 === 0) {
                        let num = randomIntFromInterval(Math.round(canvas.height/5.6889), Math.round(canvas.height/1.706));
                        let top = new ImageSprite(canvas.width, 0, canvas.width/10, num, topPipeImage);
                        bottomStart = canvas.height - foreground.height;
                        bottom = new ImageSprite(canvas.width, num + gap, canvas.width/10, bottomStart - num - gap, bottomPipeImage);
                        pipe.push(top);
                        pipe.push(bottom);
                    }
                }
            }

            // check for collision with pipes
            if (pipe[i].intersects(bird)) {
                ongoing = false;
                console.log("hit pipe");
            }

            //check for collision with foreground
            if (bird.intersects(foreground)) {
                console.log("intersects ground");
                ongoing = false;
            }
            //if pipe passes bird add to score
            if (pipe[i].x === 20) {
                //two pipes pass bird only want to add 1 to score
                if (i % 2 === 0) {
                    score++;
                }
            }
            //if pipe off screen remove from array
            // makes game glitchy
            /*if (pipe[i].x < -75) {
                pipe.shift();
                pipe.shift();
            }*/
        }

        foreground.draw(ctx);
        bird.draw(ctx);
        bird.incrementY(gravity);

        ctx.fillStyle = "black";
        ctx.font = canvas.width/35+"px Verdana";
        ctx.fillText("Score : " + score, 10, canvas.height - canvas.height/25.6);

        if (ongoing === true) {
            requestAnimationFrame(draw);
        } else if (ongoing === false) {
            ctx.fillText("Click jump to start", canvas.width/2.8, canvas.height - canvas.height/10.24);
            //inserting score into database
            if(score > 0){
            //console.log("http://localhost:4444/insert/" + $scope.username + "/" + score);
            //inserting score into database
           $http.get("http://localhost:4444/insert/" + $scope.username + "/" + score)
                .then(function (response) {
                    $scope.err = response.data;
                }).catch(function (err) {
                $scope.err = "type in username to save scores"
            });
            }
        }
    }

    draw();

    $scope.insertScore = function (score) {
        $http.get("http://localhost:4444/insert/" + $scope.username + "/" + score)
            .then(function (response) {
                $scope.inserted = response.data;
            }).catch(function (err) {
            $scope.err = "failed to insert score"
        });
    };
});

//same as game controller but different bird and background image
app.controller('adminGameCtrl', function ($scope, $http) {
    $scope.username = username;
    let canvas = document.getElementById("canvas1");
    let ctx = canvas.getContext("2d");
    let ongoing = false;

    let birdImage = new Image();
    let backgroundImage = new Image();
    let foregroundImage = new Image();
    let topPipeImage = new Image();
    let bottomPipeImage = new Image();

    birdImage.src = "img/birds/whiteBird.png";
    backgroundImage.src = "img/backgrounds/nightBG.png";
    foregroundImage.src = "img/backgrounds/fg.png";
    topPipeImage.src = "img/pipes/pipeSouth.png";
    bottomPipeImage.src = "img/pipes/pipeNorth.png";

    let gap = canvas.height/6;
    let constant;
    let birdX = canvas.width/9.33;
    let birdY = canvas.height/5.2;
    let gravity = canvas.height/341.33;
    let score = 0;
    let pipe = [];
    let top;
    let bottom;
    let bottomStart;
    //variable to make pipes move at a speed that considers the canvas width so not too fast on small screen or too slow on big
    let bigScreen = false;
    if(canvas.width>500)
    {
        bigScreen = true;
    }

    let bird = new ImageSprite(birdX, birdY, canvas.width/18.421, canvas.height/19.6923, birdImage);
    let background = new ImageSprite(0, 0, canvas.width, canvas.height, backgroundImage);
    let foreground = new ImageSprite(0, canvas.height/1.28, canvas.width, canvas.height-canvas.height/1.28, foregroundImage);


    // key down event
    $scope.jump =(function () {
        if (ongoing === true) {
            if (bird.y > 0) {
                bird.incrementY(-canvas.height/20.48);
            }
        } else {
            console.log("restarted");
            //starts new game if game is not currently ongoing
            $scope.err = "";
            pipe = [];
            let num = randomIntFromInterval(Math.round(canvas.height/5.6889), Math.round(canvas.height/1.706));
            let top = new ImageSprite(canvas.width, 0, canvas.width/10, num, topPipeImage);
            bottomStart = canvas.height - foreground.height;
            bottom = new ImageSprite(canvas.width, num + gap, canvas.width/10, bottomStart - num - gap, bottomPipeImage);
            pipe[0] = top;
            pipe[1] = bottom;
            score = 0;
            bird.x = canvas.width/9.33;
            bird.y = canvas.height/5.2;
            bird.draw(ctx);
            ongoing = true;
            draw();
        }
    });

    function draw() {
        background.draw(ctx);
        for (let i = 0; i < pipe.length; i++) {
            pipe[i].draw(ctx);
            //moves pipes over
            pipe[i].x--;
            if(bigScreen){
                pipe[i].x--;
            }

            //adds new pipe every time the pipes x value gets to certain value
            if(bigScreen){
                if (pipe[i].x === Math.round(canvas.width/1.8) || pipe[i].x === Math.round(canvas.width/1.8)+1) {
                    //two pipes have x of value but only want to add one new top and bottom image sprite
                    if (i % 2 === 0) {
                        let num = randomIntFromInterval(Math.round(canvas.height/5.6889), Math.round(canvas.height/1.706));
                        let top = new ImageSprite(canvas.width, 0, canvas.width/10, num, topPipeImage);
                        bottomStart = canvas.height - foreground.height;
                        bottom = new ImageSprite(canvas.width, num + gap, canvas.width/10, bottomStart - num - gap, bottomPipeImage);
                        pipe.push(top);
                        pipe.push(bottom);
                    }
                }
            }
            else{
                if (pipe[i].x === Math.round(canvas.width/1.8)) {
                    //two pipes have x of value but only want to add one new top and bottom image sprite
                    if (i % 2 === 0) {
                        let num = randomIntFromInterval(Math.round(canvas.height/5.6889), Math.round(canvas.height/1.706));
                        let top = new ImageSprite(canvas.width, 0, canvas.width/10, num, topPipeImage);
                        bottomStart = canvas.height - foreground.height;
                        bottom = new ImageSprite(canvas.width, num + gap, canvas.width/10, bottomStart - num - gap, bottomPipeImage);
                        pipe.push(top);
                        pipe.push(bottom);
                    }
                }
            }

            // check for collision with pipes
            if (pipe[i].intersects(bird)) {
                ongoing = false;
                console.log("hit pipe");
            }

            //check for collision with foreground
            if (bird.intersects(foreground)) {
                console.log("intersects ground");
                ongoing = false;
            }
            //if pipe passes bird add to score
            if (pipe[i].x === 20) {
                //two pipes pass bird only want to add 1 to score
                if (i % 2 === 0) {
                    score++;
                }
            }
            //if pipe off screen remove from array
            // makes game glitchy
            /*if (pipe[i].x < -75) {
                pipe.shift();
                pipe.shift();
            }*/
        }

        foreground.draw(ctx);
        bird.draw(ctx);
        bird.incrementY(gravity);

        ctx.fillStyle = "black";
        ctx.font = canvas.width/35+"px Verdana";
        ctx.fillText("Score : " + score, 10, canvas.height - canvas.height/25.6);

        if (ongoing === true) {
            requestAnimationFrame(draw);
        } else if (ongoing === false) {
            ctx.fillText("Click jump to start", canvas.width/2.8, canvas.height - canvas.height/10.24);
            //inserting score into database
            if(score > 0){
                //console.log("http://localhost:4444/insert/" + $scope.username + "/" + score);
                $http.get("http://localhost:4444/insert/" + $scope.username + "/" + score)
                     .then(function (response) {
                         $scope.err = response.data;
                     }).catch(function (err) {
                     $scope.err = "failed inserting score"
                 });
            }
        }
    }
    draw();
});
app.controller('scoresCtrl', function ($scope, $http) {
    console.log("get scores");
    $scope.getScores = function () {
        $http.get("http://localhost:4444/scores")
            .then(function (response) {
                $scope.scores = response.data;
                console.log($scope.scores);
            }).catch(function (err) {
            $scope.err = "failed to get scores from server"
        });
    };
    $scope.getScores();
    $scope.getScoresByUsername = function () {
        $http.get("http://localhost:4444/scores/" + $scope.user)
            .then(function (response) {
                $scope.scores = response.data;
                console.log($scope.scores);
                if ($scope.scores.length === 0) {
                    $scope.err = "No Scores for given user"
                }
            }).catch(function (err) {
            $scope.err = "failed to get scores from server"
        });
    };
});
app.controller('loginCtrl', function ($scope, $http, $location) {
    $scope.login = function () {
        //console.log("http://localhost:4444/login/" + $scope.username + "/" + $scope.password);
        let cont = true;
        if ($scope.username === undefined || $scope.username === "") {
            $scope.err = "Please enter username";
            cont = false;

        }
        if ($scope.password === undefined || $scope.password === "") {
            $scope.err = "Please enter password";
            cont = false;
        }
        if ($scope.username === undefined && $scope.password === undefined) {
            $scope.err = "Please enter username and password";
            cont = false;
        }
        if (cont === true) {
            $scope.err = "";
            $http.get("http://localhost:4444/login/" + $scope.username + "/" + $scope.password)
                .then(function (response) {
                    $scope.res = response.data;
                    if ($scope.res === "success") {
                        username = $scope.username;
                        $location.path("/admin");
                    }
                }).catch(function (err) {
                $scope.err = "Failed to connect to server"
            });
        }
        /*  let formdata = new FormData();
             formdata.append('username', $scope.username);
             formdata.append('password', $scope.password);

             $http.post('http://localhost:4444/login', formdata).subscribe(
                 res => {
                     const response = res.text();
                 }
             );*/
    };
});
app.controller('registerCtrl', function ($scope, $http) {
    $scope.register = function () {
        //console.log("http://localhost:4444/register/" + $scope.username + "/" + $scope.password);
        let cont = true;
        if ($scope.username === undefined || $scope.username === "") {
            $scope.err = "Please enter username";
            cont = false;

        }
        if ($scope.password === undefined || $scope.password === "") {
            $scope.err = "Please enter password";
            cont = false;
        }
        if ($scope.username === undefined && $scope.password === undefined) {
            $scope.err = "Please enter username and password";
            cont = false;
        }
        if (cont === true) {
            $scope.err = "";
            $http.get("http://localhost:4444/register/" + $scope.username + "/" + $scope.password)
                .then(function (response) {
                    $scope.err = response.data;
                    console.log($scope.err);
                    $location.path("/login");
                }).catch(function (err) {
                $scope.err = response.data;
            });
        }
        /*  let formdata = new FormData();
             formdata.append('username', $scope.username);
             formdata.append('password', $scope.password);

             $http.post('http://localhost:4444/register', formdata).subscribe(
                 res => {
                     const response = res.text();
                 }
             );*/
    };
});
