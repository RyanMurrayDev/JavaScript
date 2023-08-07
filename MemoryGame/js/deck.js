class Deck{
    constructor(){
        let deck = [];
        for(let i=0; i<52; i++)
        {
            deck[i] = new Card(i);
        }
        this._deck = deck;
    }
    get deck(){
        return this._deck;
    }

    get_card(x){
        return this._deck[x];
    }

    Shuffle()
    {
        let temp;
        for(let i=0; i<52; i++)
        {
            let x = Math.floor(Math.random()*51) + 1;
            //console.log(x);
             temp = this._deck[i];
            this._deck[i] = this._deck[x];
            this._deck[x] = temp;
        }
        return this._deck
    }
    toString(){
      return this._deck;
    }
}

/* let d = new Deck();
console.log(d);
d.Shuffle();
console.log(d);
console.log(d.get_card(0)); */