function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
class FlappyBird{
    constructor(canvas, ctx, birdImage, northPipe, southPipe, foregroundImg, backgroundImg){
        this._canvas = canvas;
        this._ctx = ctx;
        this.northPipe = northPipe;
        this.southPipe = southPipe;

        this.gap = canvas.height/6;
        this.birdX = canvas.width / 9.33;
        this.birdY = canvas.height / 5.2;
        this.gravity = canvas.height / 500;
        this._score = 0;
        this.pipe = [];
        this.ongoing = false;
        this.bird = new ImageSprite(canvas.width / 9.33, canvas.height / 5.2,  canvas.width / 18.421, canvas.height / 19.6923, birdImage);
        this.backgroundIS = new ImageSprite(0, 0, canvas.width, canvas.height, backgroundImg);
        this.foregroundIS = new ImageSprite(0, canvas.height / 1.28, canvas.width, canvas.height - canvas.height / 1.28, foregroundImg);
        this._backgroundImg = backgroundImg;
        this.bigScreen = false;
        if (canvas.width > 500) {
            this.bigScreen = true;
        }
    }

    get score() {
        return this._score;
    }

    /*get birdImage() {
        return this._birdImage;
    }

    set birdImage(value) {
        this._birdImage = value;
    }

    get backgroundImg() {
        return this._backgroundImg;
    }

    set backgroundImg(value) {
        this._backgroundImg = value;
    }*/

    isOngoing(){
       return this.ongoing;
    }


    onKeyDown(canvas) {
        if (this.ongoing === true) {
           if (this.bird.y > 0) {
                this.bird.incrementY(-canvas.height / 20.48);
            }
        } else {
            //starts new game if game is not currently ongoing
            //resets pipes
            this.pipe = [];
            let num = randomIntFromInterval(Math.round(canvas.height / 5.6889), Math.round(canvas.height / 1.706));
            let top = new ImageSprite(canvas.width, 0, canvas.width / 10, num, this.southPipe);
            let bottomStart = canvas.height - this.foregroundIS.height;
            let bottom = new ImageSprite(canvas.width, num + this.gap, canvas.width / 10, bottomStart - num - this.gap, this.northPipe);
            this.pipe[0] = top;
            this.pipe[1] = bottom;
            this._score = 0;
            this.bird.x = canvas.width / 9.33;
            this.bird.y = canvas.height / 5.2;
            this.ongoing = true;
        }
    }

    update(canvas, ctx) {
        //loops over all pipes
        for (let i = 0; i < this.pipe.length; i++) {
            //move pipes over
            this.pipe[i].x--;
            if (this.bigScreen) {
                this.pipe[i].x--;
            }
            //adds new pipe every time the pipes x value gets to canvas.width / 1.8
            if(this.bigScreen){
                //if bigScreen I increment by 2 so not guaranteed it'll equal a whole number relative
                // to canvas width so check a number or that number plus 1
                if (this.pipe[i].x === Math.round(canvas.width / 1.8) || this.pipe[i].x === Math.round(canvas.width / 1.8) + 1) {
                    //two pipes have x of that position but only want to add one new top and bottom image sprite
                    if (i % 2 === 0) {
                        let num = randomIntFromInterval(Math.round(canvas.height / 5.6889), Math.round(canvas.height / 1.706));
                        let top = new ImageSprite(canvas.width, 0, canvas.width / 10, num, this.southPipe);
                        let bottomStart = canvas.height - this.foregroundIS.height;
                        let bottom = new ImageSprite(canvas.width, num + this.gap, canvas.width / 10, bottomStart - num - this.gap, this.northPipe);
                        this.pipe.push(top);
                        this.pipe.push(bottom);
                    }
                }
            }
            else {
                if (this.pipe[i].x === Math.round(canvas.width / 1.8)) {
                    //two pipes have x of that position but only want to add one new top and bottom image sprite
                    if (i % 2 === 0) {
                        let num = randomIntFromInterval(Math.round(canvas.height / 5.6889), Math.round(canvas.height / 1.706));
                        let top = new ImageSprite(canvas.width, 0, canvas.width / 10, num, this.southPipe);
                        let bottomStart = canvas.height - this.foregroundIS.height;
                        let bottom = new ImageSprite(canvas.width, num + this.gap, canvas.width / 10, bottomStart - num - this.gap, this.northPipe);
                        this.pipe.push(top);
                        this.pipe.push(bottom);
                    }
                }
            }
            // check for collision with pipes
            if (this.pipe[i].intersects(this.bird)) {
                this.ongoing = false;
                console.log("hit pipe");
            }

            //check for collision with foreground
            if (this.bird.intersects(this.foregroundIS)) {
                //console.log("intersects ground");
                this.ongoing = false;
            }
            //if pipe passes bird add to score
            if (this.pipe[i].x === 20) {
                //two pipes pass bird only want to add 1 to score
                if (i % 2 === 0) {
                    this._score++;
                }
            }


            //only place I call for gravity  comment out and bird never falls

            this.bird.incrementY(this.gravity);
            /*if(this.isOngoing()){
                console.log(this.bird.y);
                console.log("gravity" + this.gravity);
            }*/



        }
    }

    draw(canvas, ctx){
        this.backgroundIS.draw(ctx);
        this.foregroundIS.draw(ctx);
        this.bird.draw(ctx);
        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i].draw(ctx);
        }
        ctx.fillStyle = "black";
        ctx.font = canvas.width / 35 + "px Verdana";
        ctx.fillText("Score : " + this._score, 10, canvas.height - canvas.height / 25.6);
        if (this.ongoing === false) {
            ctx.fillText("Click jump to start", canvas.width / 2.8, canvas.height - canvas.height / 10.24);
            //inset score into database
        }
    }

}