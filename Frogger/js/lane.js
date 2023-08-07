/**
 * Lane
 */
class Lane
{
    /**
     * constructor
     * (Initializes an array of horizontal repeaters and sets the lane's properties)
     * @param numOfHorizontalRepeaters
     * @param verticalGap
     * @param frameDuration
     * @param direction
     * @param yPositionOfRepeaters
     * @param repeaterWidth
     * @param repeaterHeight
     * @param rangeMin
     * @param rangeMax
     * @param repeaterImage
     */
    constructor(numOfHorizontalRepeaters, verticalGap, frameDuration, direction, yPositionOfRepeaters,
                repeaterWidth, repeaterHeight, rangeMin, rangeMax, repeaterImage)
    {
        // Variables
        this._horizontalRepeaters = new array();
        this._verticalGap = verticalGap;
        this._direction = direction;
        this._rangeMin = rangeMin;
        this._rangeMax = rangeMax;

        // The spacing between each horizontal repeater
        let hrSpacing = rangeMax / numOfHorizontalRepeaters;
        let nextXPosition = hrSpacing;

        // Loop the given number of times
        for (let i = 0; i < numOfHorizontalRepeaters; i++)
        {
            // Create a new horizontal repeater (frameDuration, directon, x, y, width, height, rangeMin, rangeMax, image)
            this.pushHorizontalRepeater(new HorizontalRepeater(frameDuration, direction, nextXPosition,
                                                               yPositionOfRepeaters, repeaterWidth, repeaterHeight,
                                                               rangeMin, rangeMax, repeaterImage));

            // Increase the next x position
            nextXPosition += hrSpacing;
        }
    }



    /*********************
     * Getters / Setters *
     *********************/

    /**
     * get horizontalRepeaters
     * @returns {Array}
     */
    get horizontalRepeaters()
    {
        return this._horizontalRepeaters;
    }

    /**
     * set horizontalRepeaters
     * @param value
     */
    set horizontalRepeaters(value)
    {
        this._horizontalRepeaters = value;
    }

    /**
     * get direction
     * @returns {*}
     */
    get direction()
    {
        return this._direction;
    }

    /**
     * set direction
     * @param value
     */
    set direction(value)
    {
        this._direction = value;
    }

    /**
     * get verticalGap
     * @returns {*}
     */
    get verticalGap()
    {
        return this._verticalGap;
    }

    /**
     * set verticalGap
     * @param value
     */
    set verticalGap(value)
    {
        this._verticalGap = value;
    }

    /**
     * get rangeMin
     * @returns {*}
     */
    get rangeMin()
    {
        return this._rangeMin;
    }

    /**
     * set rangeMin
     * @param value
     */
    set rangeMin(value)
    {
        this._rangeMin = value;
    }

    /**
     * get rangeMax
     * @returns {*}
     */
    get rangeMax()
    {
        return this._rangeMax;
    }

    /**
     * set rangeMax
     * @param value
     */
    set rangeMax(value)
    {
        this._rangeMax = value;
    }





    /*****************
     * Array Helpers *
     *****************/

    /**
     * pushHorizontalRepeater
     * (Add a horizontal repeater to the end of the array)
     * @param hr
     */
    pushHorizontalRepeater(hr)
    {
        // Push to the horizontal repeaters
        this.horizontalRepeaters.push(hr);
    }

    /**
     * shiftHorizontalRepeater
     * (Remove the first horizontal repeater from the array)
     */
    shiftHorizontalRepeater()
    {
        // Remove the first element from the array
        this.horizontalRepeaters.shift();
    }



    /**********
     * Output *
     **********/

    /**
     * toString
     * @returns {string}
     */
    toString()
    {
        return "Lane { HorizontalRepeaters=" + this.horizontalRepeaters + ", direction=" + this.direction + " }";
    }



    /***********
     * Display *
     ***********/

    /**
     * draw
     * (Loop over each horizontal repeater and draw it, passing it the graphic context)
     * @param context
     */
    draw(context)
    {
        // Save the context
        context.save();

        // Loop over each horizontal repeater
        for (let i = 0; i < this.horizontalRepeaters.length; i++)
        {
            // Draw the current horizontal repeater
            this.horizontalRepeaters[i].draw(context);
        }

        // Restore the context
        context.restore();
    }



    /***********
     * Physics *
     ***********/

    /**
     * update
     * (Update each horizontal repeater with the given direction)
     */
    update(delta)
    {
        // Loop over each horizontal repeater
        for (let i = 0; i < this.horizontalRepeaters.length; i++)
        {
            // Update the current horizontal repeater
            this.horizontalRepeaters[i].update(delta);
        }
    }
}