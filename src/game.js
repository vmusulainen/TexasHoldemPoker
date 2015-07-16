var Game = function () {

    var players = [],
        commonCards = [],
        deck,
        finished = false,
        winner = undefined,
        stage;


    var dealStage, openCardsStage, playAgainStage;

    // the "Deal Cards" stage:
    // 1. Deal personal playing cards
    // 2. Deal common playing cards
    dealStage = function () {
        _.each(players, function (aPlayer) {
            _(2).times(function () {
                var card = deck.getPlayingCard();
                card.beOpened();
                aPlayer.addPersonalCard(card);
            });
        });
        _(5).times(function () {
            commonCards.push(deck.getPlayingCard())
        });
        commonCards.sort(function (a, b) {
            return a.compare(b)
        });

        stage = openCardsStage;
    };
    dealStage.title = "Deal Cards";

    // the "Open Cards" stage:
    // 1. Open common playing cards
    // 2. Build the highest combination for every player
    // 3. Determine the winner
    openCardsStage = function () {
        // open common cards
        _.each(commonCards, function (aPlayingCard) {
            aPlayingCard.beOpened()
        });
        // build card combinations for every player
        _.each(players, function (aPlayer) {
            aPlayer.buildCombination(commonCards)
        });

        // Choosing the winner
        // May be players have same combinations?
        var results = [];
        _.each(players, function (aPlayer) {
            var otherPlayers = _.without(players, aPlayer);

            _.each(otherPlayers, function (anotherPlayer) {
                var i = aPlayer.highestCombination().compare(anotherPlayer.highestCombination());
                results.push(i);
            });
        });
        results = _.countBy(results, function (number) {
            return number
        });
        if ((results[0]) && (results[0] !== 0)) {
            winner = undefined;
        }
        else {
            var temp = players.slice().sort(function (a, b) {
                return a.highestCombination().compare(b.highestCombination())
            });
            winner = temp.pop();
        }
        finished = true;
        stage = playAgainStage;
    };
    openCardsStage.label = "Open Cards";

    // The "Play Again" stage
    // 1. Open new deck
    // 2. Reset common cards
    // 3. Take players' cards
    playAgainStage = function () {
        deck = new Deck();
        deck.shuffle();
        commonCards = [];
        _.each(players, function (aPlayer) {
            aPlayer.reset()
        });
        finished = false;
        winner = undefined;
        dealStage();
        stage = openCardsStage;
    };
    playAgainStage.label = "Play Again";


    this.run =function(){stage()};
    this.winner = function(){return winner};
    this.hasWinner = function(){return winner !== undefined};
    this.commonCards = function () {
        return commonCards;
    };

    this.players = function () {
        return players;
    };
    this.isFinished = function(){return finished};

    _(Game.playerCount).times(function (aNumber) {
        players.push(new Player("Player " + (aNumber + 1).toString()));
    });
    deck = new Deck();
    deck.shuffle();

    stage = dealStage;
};

Game.playerCount = 2;