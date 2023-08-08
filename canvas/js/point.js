class Point{
    constructor(x,y){
        this._x = x;
        this._y = y;
    }

    get x(){
        return this._x;
    }
    set x(x){
        this._x = x;
    }
    get y(){
        return this._y;
    }
    set y(y){
        this._y = y;
    }
    toString(){
        return "(" + this._x + ", " + this._y + ")";
    }

    static distance(p1,p2)
    {
        return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y))
    }
}

function isBetween(value,min,max)
{
    return value>=min && value <= max;
}
