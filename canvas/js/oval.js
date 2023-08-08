//The Oval class should store its center point, radius, fillcolor, stroke color,stroke thickness,
// and any additional variables that make sense for the application.
// The draw method for the Oval class should either fill, stroke or both based on information stored in the object.

class Oval {
    constructor(center, radiusx,radiusy,slope, fillcolor, strokecolor, strokethickness) {
        this._center = center;
        this._radiusx = radiusx;
        this._radiusy = radiusy;
        this._slope = slope;
        this._fillcolor = fillcolor;
        this._strokecolor = strokecolor;
        this._strokethickness = strokethickness;
    }
    get center() {
        return this._center;
    }

    set center(value) {
        this._center = value;
    }

    get radiusx() {
        return this._radiusx;
    }

    set radiusx(value) {
        this._radiusx = value;
    }
    get radiusy() {
        return this._radiusy;
    }

    set radiusy(value) {
        this._radiusy = value;
    }
    get slope() {
        return this._slope;
    }

    set slope(value) {
        this._slope = value;
    }

    get fillcolor() {
        return this._fillcolor;
    }

    set fillcolor(value) {
        this._fillcolor = value;
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
    toString() {
        return "Oval{center=" + this._center + ",radiusx=" + this._radiusx + ",radiusy=" + this._radiusy + ",slope=" + this._slope +
            ", fillcolor=" + this._fillcolor + ",strokecolor=" + this._strokecolor +
            ",strokethickness=" + this._strokethickness + "}";
    }

    draw(ctx){
        ctx.strokeStyle = this._strokecolor;
        ctx.lineWidth = this._strokethickness;
        ctx.fillStyle = this._fillcolor;
        ctx.beginPath();
        if(Math.abs(this._slope) < 1.5)
        {
            ctx.ellipse(this._center.x,this._center.y,this._radiusx,this._radiusy,this._slope,0, 2 * Math.PI, false);
        }
        else{
            ctx.ellipse(this._center.x,this._center.y,this._radiusx,this._radiusy,0,0, 2 * Math.PI, false);
        }
        ctx.fill();
        ctx.stroke();
    }
}






