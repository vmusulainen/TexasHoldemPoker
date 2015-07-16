PlayingCard = function (rank, suit) {

    var _rank = rank,
        _suit = suit,
        hidden = true;

    //Just for simple inspecting in debugger
    this.rank = _rank;
    this.suit = _suit;


    this.name = function () {
        var suitCode;
        if (this.isHidden()) {
            return "?";
        }
        switch (_suit) {
            case PlayingCard.suit.hearth:
                suitCode = "\u2661";
                break;
            case PlayingCard.suit.diamonds:
                suitCode = "\u2662";
                break;
            case PlayingCard.suit.clubs:
                suitCode = "\u2667";
                break;
            case PlayingCard.suit.spades:
                suitCode = "\u2664";
                break;
            default:
                throw "Unexpected playing card's suit: " + _suit;
                break;
        }

        return _rank + " " + suitCode;
    };

    this.rank = function () {
        return _rank
    };
    this.suit = function () {
        return _suit
    };
    this.isHidden = function () {
        return hidden
    };

    this.beOpened = function () {
        hidden = false
    };

    // the method returns playingCards's weight
    // it will be 2 for "Two", 3 for "Three", ..., 11 for Jack, ..., 14 for Ace
    this.weight = function () {
        var idx = PlayingCard.ranks.indexOf(_rank);
        if (idx === -1) {
            throw "Weight of \"" + _rank + "\" not found";
        }
        return idx + 2;
    };

    // it returns:
    // 1 if the card has higher rank than aPlayingCard
    // 0 if the card has equal rank with aPlayingCard
    // -1 if the card has lower rank than aPlayingCard
    this.compare = function (aPlayingCard) {
        if (this.weight() === aPlayingCard.weight()) {
            return 0;
        }
        if (this.weight() < aPlayingCard.weight()) {
            return -1;
        }
        return 1;
    }
};


PlayingCard.suit = {hearth: "Hearth", diamonds: "Diamonds", clubs: "Clubs", spades: "Spades"};
PlayingCard.suits = _.values(PlayingCard.suit);
PlayingCard.rank = {
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    ten: "10",
    jack: "J",
    queen: "Q",
    king: "K",
    ace: "A"
};
PlayingCard.ranks = _.values(PlayingCard.rank);