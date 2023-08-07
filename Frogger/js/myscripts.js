$(document).ready( function(){
    let canvas = document.getElementById("canvas1");
    let ctx = canvas.getContext("2d");

    let background = document.getElementById("background");
    let score = 0;
    let lives = 3;
    let time = 60;
    let frogX = 370;
    let frogY = 490;
    let frogImage = new Image;
    let forward = new Image;
    forward.src = "images/frogger_front.png";
    frogImage.src = "images/frogger_front.png";
    let frogger = new ImageSprite(frogX,frogY,52,48,frogImage);
    let squareImage = new Image;
    let square = new ImageSprite(0,0,100,100,squareImage);
    let canMoveForward = true;
    let canMoveLeft = true;
    let canMoveRight = true;
    let canMoveBack = false;
    let frogarray = [];
    let isFilled = [false,false,false,false,false];

    ctx.drawImage(background,0,0, 800, 600);
    frogger.draw(ctx);
    square.draw(ctx);

    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,100,canvas.height-20);
    ctx.fillText("Lives : "+lives,350,canvas.height-20);
    ctx.fillText("Time : "+time,600,canvas.height-20);
    ctx.rect(800,canvas.height-20,100,100);
    ctx.fill();

    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;
    if(canMoveForward){
        if (e.keyCode == '38') {
            // up arrow
            frogImage.src = "images/frogger_front.png";
            frogger.incrementY(-53);
        }
    }
        if(canMoveBack){
            if (e.keyCode == '40') {
                // down arrow
                frogImage.src = "images/frogger_back.png";
                frogger.incrementY(53);

            }
        }
       if(canMoveLeft){
           if (e.keyCode == '37') {
               // left arrow
               frogImage.src = "images/frogger_left.png";
               frogger.incrementX(-75);
           }
       }
        if(canMoveRight){
            if (e.keyCode == '39') {
                // right arrow
                frogImage.src = "images/frogger_right.png";
                frogger.incrementX(75);
            }
        }


        function draw()
        {
            ctx.drawImage(background,0,0, 800, 600);
            frogger.draw(ctx);
            square.draw(ctx);
            if(frogger.x === 70){
                canMoveLeft = false;
            }
            else{
                canMoveLeft = true;
            }
            if(frogger.x === 670){
                canMoveRight = false;
            }
            else{
                canMoveRight = true;
            }
            if(frogger.y === 490){
                canMoveBack = false;
            }
            else{
                canMoveBack = true;
            }
            if(frogger.x === 370 && frogger.y === 172)
            {
                    canMoveForward = true;

            }
            else if(frogger.x === 220 && frogger.y === 172)
            {

                    canMoveForward = true;

            }

            else if(frogger.x === 70 && frogger.y === 172)
            {
                    canMoveForward = true;

            }

            else if(frogger.x === 520 && frogger.y === 172)
            {
                canMoveForward = true;
            }

            else if(frogger.x === 670 && frogger.y === 172)
            {
                canMoveForward = true;
            }
            else if(frogger.y === 172)
            {
                canMoveForward = false;
            }
            else if(frogger.y === 119)
            {
                if(frogger.x === 70)
                {
                    if(isFilled[0] = true)
                    {
                        frogger.y += 53;
                    }
                    isFilled[0] = true;
                }
                if(frogger.x === 220)
                {
                    if(isFilled[1] = true)
                    {
                        frogger.y += 53;
                    }
                    isFilled[1] = true;
                }
                if(frogger.x === 370)
                {
                    if(isFilled[2] = true)
                    {
                        frogger.y += 53;
                    }
                    isFilled[2] = true;
                }
                if(frogger.x === 520)
                {
                    if(isFilled[3] = true)
                    {
                        frogger.y += 53;
                    }
                    isFilled[3] = true;
                }
                if(frogger.x === 670)
                {
                    if(isFilled[4] = true)
                    {
                        frogger.y += 53;
                    }
                    isFilled[4] = true;
                }
                let froggercopy = new ImageSprite(frogger.x,frogger.y-53,52,48,forward);
                frogger.x= 370;
                frogger.y= 490;
                score += 10;
                frogarray.push(froggercopy);
            }

            for (let i = 0; i < frogarray.length; i++) {
                frogarray[i].draw(ctx);
            }
            //console.log("frog position" + frogger.x + "," + frogger.y);
            //console.log("canmoveforward" + canMoveForward);
            console.log(frogarray);
            ctx.fillStyle = "white";
            ctx.font = "20px Verdana";
            ctx.fillText("Score : "+score,100,canvas.height-20);
            ctx.fillText("Lives : "+lives,350,canvas.height-20);
            ctx.fillText("Time : "+time,600,canvas.height-20);
            ctx.rect(800,canvas.height-20,100,100);
            ctx.fill();
            //setTimeout(function(){ time--; }, 1000);
            requestAnimationFrame(draw);
        }
        draw();
    }




});