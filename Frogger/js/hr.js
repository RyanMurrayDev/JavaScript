class HorizontalRepeater extends ImageSprite {
    constructor(frameDuration, direction, x, y, width,height, rangeMin, rangeMax,image) {
        super(x,y,width,height,image);
        this.direction = direction;
        this.delta = 0;
        this.frameDuration = frameDuration;
        this.rangeMin = rangeMin;
        this.rangeMax = rangeMax;
    }

    update(delta) {
        this.delta += delta;
        if (this.delta >= this.frameDuration) {
            if (this.direction == "left") {
                this.incrementX(-1);
                if (this.right <= this.rangeMin) {
                    this.x = this.rangeMax;
                }
            } else if(this.direction == "right"){
                this.incrementX(1);
                if (this.x >= this.rangeMax) {
                    this.right = this.rangeMin;
                }
            }else{
                console.log("Direction needs to be 'left' or 'right'");
            }
            this.delta = 0;
        }
    }
}