Deck = function () {
    var playingCards = [];

    _.each(PlayingCard.suits, function (suite) {
        _.each(PlayingCard.ranks, function (rank) {
            playingCards.push(new PlayingCard(rank, suite))
        });
    });

    this.shuffle = function () {
        playingCards = _.shuffle(playingCards);
    };

    this.playingCards = function () {
        return playingCards;
    };

    this.getPlayingCard = function () {
        var card, index;
        card = _.sample(playingCards);
        index = playingCards.indexOf(card);
        playingCards.splice(index, 1);
        return card;
    }
};