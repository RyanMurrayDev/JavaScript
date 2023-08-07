
const TABLE_ROWS = 20;
const TABLE_COLS = 20;
const NUM_BOMBS = 100;
const FLAG_IMAGE = "minesweeper/stop.gif";
const BOMB_IMAGE = "minesweeper/b.gif";
const UNCHECKED_IMAGE = "minesweeper/rockbutton.png";
const BLANK_IMAGE = "minesweeper/0.gif";

let minesweeper = new Minesweeper(TABLE_ROWS,TABLE_COLS);

$(document).ready(function(){
    minesweeper.randomizeBombs(TABLE_ROWS,TABLE_COLS,NUM_BOMBS,BOMB_IMAGE,BLANK_IMAGE);
    createGrid(document.getElementById("div1"));

    $("#restartButton").click(function(evt) {
        let restart = document.getElementById("restartButton");
        restart.style.visibility = "hidden";
        let div2 = document.getElementById("div2");
        div2.style.visibility = "hidden";
        console.log("clicked");
        $("#div1").empty();
       minesweeper = new Minesweeper(TABLE_ROWS,TABLE_COLS);
        minesweeper.randomizeBombs(TABLE_ROWS,TABLE_COLS,NUM_BOMBS,BOMB_IMAGE,BLANK_IMAGE);
        createGrid(document.getElementById("div1"));
       //location.reload();
    });

});

function createGrid(parentContainer)
{
    let table = document.createElement("table");
    parentContainer.appendChild(table);
    for(let row=0; row < minesweeper.tablerows; row++)
    {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        for(let col=0; col<minesweeper.tablecols;col++)
        {
            let td = document.createElement("td");
            tr.appendChild(td);
            let img = document.createElement("img");
            img.src = UNCHECKED_IMAGE;
            img.alt = "minesweeper square";
            img.id = "cell_" + row + "_" + col;
            img.altSrc = minesweeper.bombTable[row][col];
            img.row = row;
            img.col = col;
            td.appendChild(img);
            img.addEventListener("click",function(evt){
                console.log("click");
                this.src = this.altSrc;
                console.log("alt src " + this.altSrc);
                console.log("bomb img " + BOMB_IMAGE);
                if(this.altSrc == BOMB_IMAGE)
                {
                    let div2 = document.getElementById("div2");
                    div2.style.visibility = "visible";
                    let restart = document.getElementById("restartButton");
                    restart.style.visibility = "visible";
                }
                console.log(minesweeper.adjacentBombCount(this.row,this.col,BOMB_IMAGE));
            });
            img.addEventListener("contextmenu",function(evt){
                console.log("right click");
                console.log(this.src);
                if( this.src.endsWith(UNCHECKED_IMAGE)  )
                {
                    this.src = FLAG_IMAGE;
                }
                else
                {
                    this.src = UNCHECKED_IMAGE;
                }
                evt.preventDefault();
                return false;
            });

        }
    }
}

