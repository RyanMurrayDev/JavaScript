//The Line class should store 2 Point objects and have a draw method that draws a line between the 2 points.
// It should also store its stroke thickness and color

class Line {
    constructor(p1, p2, thickness, color) {
        this._p1 = p1;
        this._p2 = p2;
        this._thickness = thickness;
        this._color = color;
    }

    get p1() {
        return this._p1;
    }

    set p1(value) {
        this._p1 = value;
    }

    get p2() {
        return this._p2;
    }

    set p2(value) {
        this._p2 = value;
    }

    get thickness() {
        return this._thickness;
    }

    set thickness(value) {
        this._thickness = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    toString() {
        return "Line{p1=" + this._p1 + ",p2=" + this._p2 +
            ", thickness=" + this._thickness + ",color=" + this._color + "}";
    }

    draw(ctx){
        ctx.beginPath();
        ctx.strokeStyle = this._color;
        ctx.lineWidth = this._thickness;
        ctx.moveTo(this._p1.x,this._p1.y);
        ctx.lineTo(this._p2.x,this._p2.y);
        ctx.stroke();
    }

}