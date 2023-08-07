class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }

    toString() {
        return "(" + this._x + ", " +
            this._y + ")";
    }

    static distance(p1, p2) {
        return Math.sqrt(
            (p1.x - p2.x) * (p1.x - p2.x) +
            (p1.y - p2.y) * (p1.y - p2.y));
    }
}

function isBetween(value, min, max) {
    return value >= min && value <= max;
}

class Rectangle {
    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get left() {
        return this._x;
    }

    get right() {
        return this._x + this._width;
    }

    get top() {
        return this._y;
    }

    get bottom() {
        return this._y + this._height;
    }

    get center() {
        return new Point(this._x + this._width / 2,
            this._y + this._height / 2)
    }

    set x(x) {
        this._x = x;
    }

    set y(y) {
        this._y = y;
    }

    set width(width) {
        this._width = width;
    }

    set height(height) {
        this._height = height;
    }

    set left(left) {
        this._x = left;
    }

    set right(right) {
        this._x = right - this._width;
    }

    set top(top) {
        this._y = top;
    }

    set bottom(bottom) {
        this._y = bottom - this._height;
    }

    set center(point) {
        this._x = point.x - this._width / 2;
        this._y = point.y - this._height / 2;
    }

    toString() {
        return "Rectangle{x=" + this._x + ",y=" + this._y +
            ", width=" + this._width + ",height=" +
            this._height + ",center=" + this.center + "}";
    }

    contains(point) {
        return isBetween(point.x, this.left, this.right) && isBetween(point.y, this.top, this.bottom);
    }

    containsRect(rect) {
        return this.contains(new Point(rect.x, rect.y)) && this.contains(new Point(rect.x + rect.width, rect.y)) && this.contains(new Point(rect.x, rect.y + rect.height)) && this.contains(new Point(rect.x + rect.width, rect.y + rect.height));
    }

    intersects(rect) {
        return !(rect.left > this.right ||
            rect.right < this.left ||
            rect.top > this.bottom ||
            rect.bottom < this.top);
    }

    draw(g) {
        g.save();
        g.stokeStyle = "#000000";
        g.strokeRect(this._x, this._y, this._width, this._height);
        g.restore();
    }

}

class Sprite extends Rectangle {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    incrementX(distance) {
        this._x += distance;
    }

    incrementY(distance) {
        this._y += distance;
    }
}

class ImageSprite extends Sprite {
    constructor(x, y, width, height, img) {
        super(x, y, width, height);
        this._img = img;
    }

    get img() {
        return this._img;
    }

    set img(img) {
        this._img = img;
    }

    draw(g) {
        g.save();
        g.drawImage(this._img, 0, 0, this._img.width,
            this._img.height, this._x, this._y, this._width,
            this._height);
        g.restore();
    }
}



