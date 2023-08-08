//The Rectangle class should store top,left position, width, height, stroke color,
// stroke thickness, fillcolor  and any additional variables that make sense for the application.
// The draw method for the Rectangle class should either fill, stroke or both based on information stored in the object.


//rectangle class we did in class
class Rectangle {
    constructor(topleft,width,height,strokecolor,strokethickness,fillcolor) {
        this._topleft = topleft;
        this._width = width;
        this._height = height;
        this._strokecolor = strokecolor;
        this._strokethickness = strokethickness;
        this._fillcolor = fillcolor;
    }

    get topleft() {
        return this._topleft;
    }

    set topleft(value) {
        this._topleft = value;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get strokecolor() {
        return this._strokecolor;
    }

    set strokecolor(value) {
        this._strokecolor = value;
    }

    get strokethickness() {
        return this._strokethickness;
    }

    set strokethickness(value) {
        this._strokethickness = value;
    }

    get fillcolor() {
        return this._fillcolor;
    }

    set fillcolor(value) {
        this._fillcolor = value;
    }

    toString() {
        return "Rectangle{topleft=" + this._topleft + ", width=" + this._width + ",height=" + this._height +
            ",strokecolor=" + this._strokecolor + ",strokethickness=" + this._strokethickness +
            ",fillcolor=" + this._fillcolor +"}";
    }
    draw(ctx){
        ctx.strokeStyle = this._strokecolor;
        ctx.lineWidth = this._strokethickness;
        ctx.fillStyle = this._fillcolor;
        ctx.beginPath();
        ctx.rect(this._topleft.x,this._topleft.y,this._width,this._height);
        ctx.fill();
        ctx.stroke();
    }
}