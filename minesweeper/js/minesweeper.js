class Minesweeper {
    constructor(tablerows,tablecols) {
        let bombTable = new Array(tablerows);
        for(let row = 0; row < tablerows; row++)
        {
            bombTable[row] = new Array(tablecols);
        }
        this.bombTable = bombTable;
        this.tablerows = tablerows;
        this.tablecols = tablecols;
    }

    adjacentBombCount(row, col,bombimg) {
        let count = 0;
        try {
            if (this.bombTable[row - 1][col - 1] == bombimg) {
                count++;
            }
        }
        catch (err) {
            //index out of bounds exception at row,col so no bomb
        }
        try {
            if (this.bombTable[row - 1][col] == bombimg) {
                count++;
            }
        }
        catch (err) {
        }
        try {
            if (this.bombTable[row - 1][col + 1] == bombimg) {
                count++;
            }
        }
        catch (err) {
        }
        try {
            if (this.bombTable[row][col - 1] == bombimg) {
                count++;
            }
        }
        catch (err) {
        }
        try {
            if (this.bombTable[row][col + 1] == bombimg) {
                count++;
            }
        }
        catch (err) {
        }
        try {
            if (this.bombTable[row + 1][col - 1] == bombimg) {
                count++;
            }
        }
        catch (err) {
        }
        try {
            if (this.bombTable[row + 1][col] == bombimg) {
                count++;
            }
        }
        catch (err) {
        }
        try {
            if (this.bombTable[row + 1][col + 1] == bombimg) {
                count++;
            }
        }
        catch (err) {
        }
        return count;
    }

randomizeBombs(tablerows,tablecols,numbombs,bombimg, blankimg) {
        let count = 0;
//Initial placement of bombs and blank spots
        for (let row = 0; row < tablerows; row++) {

            for (let col = 0; col < tablecols; col++) {
                if (count < numbombs) {
                    this.bombTable[row][col] = bombimg;
                }
                else {
                    this.bombTable[row][col] = blankimg;
                }
                count++;
            }
        }
//randomize the bombs by swapping with random locations
        for (let row = 0; row < tablerows; row++) {
            for (let col = 0; col < tablecols; col++) {
                let randomRow = Math.trunc(Math.random() * tablerows);
                let randomCol = Math.trunc(Math.random() * tablecols);
                let temp = this.bombTable[row][col];
                this.bombTable[row][col] = this.bombTable[randomRow][randomCol];
                this.bombTable[randomRow][randomCol] = temp;

            }
        }
        //Add adjacent count images to show how many bombs are adjacent
        for (let row = 0; row < tablerows; row++) {
            for (let col = 0; col < tablecols; col++) {
                if (this.bombTable[row][col] !== bombimg) {
                    let count = this.adjacentBombCount(row, col,bombimg);
                    this.bombTable[row][col] = "minesweeper/" + count + ".gif";
                }

            }
        }
    }

}
