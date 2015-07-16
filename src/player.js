Player = function (name) {
    var _name = name,
        personalCards = [],
        possibleCardCombinations = [];

    this.name = function () {
        return _name
    };

    this.personalCards = function () {
        return personalCards
    };

    this.addPersonalCard = function (aPlayingCard) {
        personalCards.push(aPlayingCard);
        personalCards.sort(function (a, b) {
            return a.compare(b)
        });
    };

    this.reset = function () {
        personalCards = [];
        possibleCardCombinations = [];
    };

    this.buildCombination = function (arrayOfPlayingCards) {
        var cards = personalCards.concat(arrayOfPlayingCards);

        _.each(combination.allCombinations, function (combination) {
            if (combination.isPossibleWithCards(cards)) {
                possibleCardCombinations.push(new combination(cards));
            }
        });
        possibleCardCombinations.sort(function (a, b) {
            return a.compare(b)
        });
        possibleCardCombinations = possibleCardCombinations.reverse();
    };

    this.possibleCardCombinations = function () {
        return possibleCardCombinations;
    };

    this.highestCombination = function () {
        return _.first(possibleCardCombinations);
    }
};