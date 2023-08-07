$(document).ready(function(){
    let memory = new Memory();
    let clicked = 0;
    let lastClicked = new Card(0);
    let lastClickedNumber = lastClicked.number;
    let array = memory.deck;
    let matches = 0;
    let score = 0;
    //console.log(array);
    //console.log(array.get_card(0).number);
    let x = 0;
    let y = 75;
    let section1 = document.querySelector("#section1");
    for(let i=0; i<52; i++) {
        let img = document.createElement("img");
        //let m= memory.deck.get_card(i).number;
        //img.src = "images/" + m + ".png";
        img.src = "images/RRIDER.png";
        img.alt = "card images";
        img.style.position = "absolute";
        img.style.left = x + "px";
        img.style.top = y + "px";
        img.style.width = "100px";
        img.style.height = "100px";
        img.id = "card" + i;
        img.class = "card";
        x += 105;
        if (i % 13 == 12) {
            x = 0;
            y += 125;
        }
        section1.appendChild(img);
    }
   //add div to cover up other cards during 2 second period after clicks
    let div = document.createElement("div");
    div.id = "click";
    section1.appendChild(div);

    for (let i=0; i < 52; i++)
    {
        $("#card"+i).click(function(evt) {
            //console.log("clicked");
            let x= memory.deck.get_card(i).number;
            $("#card"+i).attr("src","images/" + x + ".png");
            clicked += 1;
            if(clicked == 2) {
                score += 1;
                $("#score").text("Guesses: " + score);
                //console.log("Last clicked number clicks=2 " + lastClickedNumber);
                clicked = 0;
                //console.log(lastClicked);
                //console.log(memory.deck.get_card(i).number);
                let match = memory.isMatch(lastClicked, memory.deck.get_card(i).number);
                if (match == true) {
                    $("#click").css("visibility","visible");
                    window.setTimeout(function () {
                        $("#card" + i).css("visibility","hidden");
                        $("#card" + lastClickedNumber).css("visibility","hidden");
                        console.log("Match: " + memory.deck.get_card(i).number + " and " + lastClicked);
                        $("#click").css("visibility","hidden");
                    }, 2000); //2 seconds
                    matches += 1;
                    if (matches == 26) {
                        $("#gameInfo").css("visibility","visible");
                        $("#again").css("visibility","visible");
                    }
                } else {
                    $("#click").css("visibility","visible");
                    window.setTimeout(function () {
                        $("#card" + lastClickedNumber).attr("src", "images/RRIDER.png");
                        $("#card" + i).attr("src", "images/RRIDER.png");
                        $("#click").css("visibility","hidden");
                    }, 2000); // 2 seconds
                }
            }
            else{
                lastClicked = memory.deck.get_card(i).number;
                for(let i=0; i <52 ; i++)
                {
                    //console.log(array.get_card(i).number);
                   if(array.get_card(i).number == lastClicked)
                   {
                       lastClickedNumber = i;
                   }
                }
                //console.log("Last clicked number clicks=1 " + lastClickedNumber)
            }
        });
    }
    $("#again").click(function(evt) {
        console.log("clicked");
        memory = new Memory();
        clicked = 0;
        lastClicked = new Card(0);
        lastClickedNumber = lastClicked.number;
        array = memory.deck;
        matches = 0;
        score = 0;
        $("#score").text("Guesses: " + score);
        $("#gameInfo").css("visibility","hidden");
        $("#again").css("visibility","hidden");
        for(let i=0; i<52; i++)
        {
            $("#card" + i).css("visibility","visible");
        }

    });
});