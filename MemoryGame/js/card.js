class Card{
    constructor(number){
        this._number = number;
    }

    get number(){
        return this._number;
    }
    set number(number){
        this._number = number;
    }
    get face(){
        let faces = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
        let x = this._number%13;
        return faces[x];
    }
    get suit(){
        let suits = ["Clubs", "Spades", "Diamonds", "Hearts"];
        let x = Math.floor(this._number/13);
        return suits[x];
    }
    toString(){
        return "Card Number: " + this._number + ", Face: " + this.face + ", Suit: " + this.suit;
    }
}

/* let c = new Card(0);
console.log(c);
console.log(c.face);
console.log(c.suit);
let c1 = new Card(51);
console.log(c1);
console.log(c1.face);
console.log(c1.suit);
console.log(c1.number);
console.log(c1.toString()); */