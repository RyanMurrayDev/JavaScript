//The Path class should store an array of points,   stroke color, stroke thickness,
// and any additional variables that make sense for the application.
// The draw method for the Path class should stroke based on information stored in the object.
// The path is not a closed shape and should draw lines from point to point in the stroke color and thickness

class Path {
    constructor(array, strokecolor, strokethickness) {
        this._array = array;
        this._strokecolor = strokecolor;
        this._strokethickness = strokethickness;
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
    addPoint(p){
        this._array.push(p);
    }
    clear(){
        this._array = [];
    }

    toString() {
        return "Path{array=" + this._array + ",strokecolor=" + this._strokecolor +
            ", strokethickness=" + this._strokethickness + "}";
    }

    draw(ctx){
            for(let i= 1 ; i<this._array.length;i++)
            {
                let line = new Line(this._array[i-1],this._array[i],this._strokethickness,this._strokecolor);
                line.draw(ctx);
            }
        }
}












