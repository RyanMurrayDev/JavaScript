$(document).ready(function(){
    let craps = new Craps();
   $("#rollButton").click(function(evt) {
       craps.roll();
       $("#die1Image").attr("src","images/dice" + craps.die1.face + ".gif");
       $("#die2Image").attr("src","images/dice" + craps.die2.face + ".gif");
       let s = "Sum: " + (craps.die1.face + craps.die2.face);
       s +="<br />";
       s += "Point: " + craps.point + "<br />";
       s += "Game State: " + craps.gameState +"<br />";
       s +="Wins: " + craps.wins + "<br />";
       s +="Losses: " + craps.losses + "<br />";
       $("#gameInfo").html(s);
       console.log(craps.wins);
       console.log(craps.losses);
       if(craps.gameState == craps.states.WIN || craps.gameState == craps.states.LOSE)
       {
           document.getElementById("rollButton").disabled = true;
           $("#gameInfo").html(s);
           window.setTimeout(function(){
               let response = confirm("Would you like to play again?");
               if(response==true)
               {
                   document.getElementById("rollButton").disabled = false;
                   craps.replay();
               }
               else{
                   s = "Thanks for playing! <br /> You had ";
                   s += craps.wins + " wins ";
                   s +="and " + craps.losses + " losses.";
                   $("#gameInfo").html(s);
               }
           },500);
       }
   });
});