class Memory {
    constructor() {
        this._deck = new Deck();
        this._deck.Shuffle();
    }

    get deck() {
        return this._deck;
    }
    isMatch(x,y){
        if(x>25 && y<26 || y>25 && x<26)
        {
            return false;
        }
        else if(x -y == 13 || x - y == -13)
        {
            return true;
        }
        else{
            return false;
        }
    }
}

/*let m = new Memory();
let deck1 = m.deck;
console.log(deck1);
let card1 = deck1.get_card(0);
let card2 = deck1.get_card(1);
console.log(card1);
console.log(card2);
//console.log(m.isMatch(card1,card2));
console.log(m.isMatch(25,38));
console.log(m.isMatch(24,37)); */
