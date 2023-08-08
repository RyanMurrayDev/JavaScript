//The Polygon class should store an array of points, stroke color, stroke thickness,
// fillcolor  and any additional variables that make sense for the application.
// The draw method for the Polygon class should either fill, stroke or both based on
// information stored in the object.  The polygon should draw as a closed path.

class Polygon {
    constructor(array, strokecolor, strokethickness, fillcolor) {
        this._array = array;
        this._strokecolor = strokecolor;
        this._strokethickness = strokethickness;
        this._fillcolor = fillcolor;
    }
    get array() {
        return this._array;
    }

    set array(value) {
        this._array = value;
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
    addPoint(p){
        this._array.push(p);
    }
    clear(){
        this._array = [];
    }
    toString() {
        return "Polygon{array=" + this._array + ",strokecolor=" + this._strokecolor +
            ", strokethickness=" + this._strokethickness + ",fillcolor=" + this._fillcolor + "}";
    }
    draw(ctx){
        ctx.strokeStyle = this._strokecolor;
        ctx.lineWidth = this._strokethickness;
        ctx.fillStyle = this._fillcolor;
        ctx.beginPath();
        let x = 0;
        this._array.forEach(function (arrayItem) {
            if(x===0)
            {
                ctx.moveTo(arrayItem.x, arrayItem.y);
                x++;
            }
            ctx.lineTo(arrayItem.x, arrayItem.y);
        });

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}






