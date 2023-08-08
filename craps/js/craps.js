function Die()
{
    this.face = 1;
    this.roll = function()
    {
        this.face = Math.floor(Math.random()*6) + 1;
        return this.face;
    }
}

/*let die1 = new Die();
let die2 = new Die();
console.log(die1);
console.log(die2);
console.log(die1.roll());
console.log(die2.roll()); */

function Craps()
{
    this.states = {ONGOING:"ongoing",WIN:"win",LOSE:"lose"};
    this.point = 0;
    this.die1 = new Die();
    this.die2 = new Die();
    this.rollNumber = 1;
    this.gameState = this.states.ONGOING;
    this.wins = 0;
    this.losses = 0;
    this.replay = function(){
        this.point = 0;
        this.rollNumber = 1;
        this.gameState = this.states.ONGOING;
    };
    this.firstRollRules = function(sum)
    {
        if( sum == 7 || sum == 11)
        {
            this.gameState = this.states.WIN;
            ++this.wins;
        }
        else if( sum == 2 || sum == 3 || sum == 12)
        {
            this.gameState = this.states.LOSE;
            ++this.losses;
        }
        else{
            this.point = sum;
            this.rollNumber++;
        }
    };
    this.futureRollRules = function(sum)
    {
      if(sum == 7)
      {
          this.gameState = this.states.LOSE;
          ++this.losses;
      }
      else if(sum === this.point)
      {
          this.gameState = this.states.WIN;
          ++this.wins;
      }
      else{
          ++this.rollNumber;
      }
    };
    this.roll = function ()
    {
        let sum = this.die1.roll() + this.die2.roll();
        if( this.rollNumber == 1)
        {
            this.firstRollRules(sum);
        }
        else{
            this.futureRollRules(sum);
        }
    };
}

/*let craps = new Craps();
while(craps.gameState == craps.states.ONGOING)
{
    craps.roll();
    console.log(craps.die1.face + ", " + craps.die2.face + " sum: " + (craps.die1.face+craps.die2.face));
    console.log(craps.gameState);
}
*/
