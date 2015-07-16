var HighCardCombination,
    OnePairCombination,
    TwoPairCombination,
    ThreeOfKindCombination,
    StraightCombination,
    FlashCombination;

var combination = {
    _cards: [],
    _name: "Combination Name",
    getCards: function () {
        return this._cards;
    },
    setCards: function (array) {
        this._cards = array;
    },
    name: function () {
        return this._name;
    },
    strength: function () {
        return undefined;
    },
    compare: function (aCombination) {
        var i;
        if (this.strength() < aCombination.strength()) {
            return -1;
        }
        if (this.strength() > aCombination.strength()) {
            return 1;
        }

        for (i = 0; i < 5; i++) {
            var result = this.getCards()[i].compare(aCombination.getCards()[i]);
            if (result !== 0) {
                return result
            }
        }
        return 0;
    }
};
function isSequence(array, func) {
    var i;
    if (array.length === 0) {
        return false;
    }

    if (array.length === 1) {
        return true;
    }

    if (func(_.first(array)) <= func(_.last(array))) {
        var a, b;
        for (i = 0; i < array.length - 1; i++) {
            a = func(array[i]);
            b = func(array[i + 1]);
            if (a + 1 !== b) {
                return false
            }
        }
        return true;
    }
    else {
        for (i = array.length - 1; i > 0; i--) {
            a = func(array[i]);
            b = func(array[i - 1]);
            if (a + 1 !== b) {
                return false
            }
        }
        return true;
    }
};

HighCardCombination = function (arrayOfCards) {

    var cards = _.sortBy(arrayOfCards, function (aPlayingCard) {
        return aPlayingCard.weight();
    });
    this.setCards(_.last(cards, 5).reverse());

    this.name = function () {
        return "High Card"
    };

    this.strength = function () {
        return 1
    };
};
HighCardCombination.prototype = combination;
HighCardCombination.isPossibleWithCards = function () {
    return true
};

OnePairCombination = function (arrayOfCards) {
    var cards;
    (function () {
        var highestPair, kickers, groups, pairs;

        groups = _.groupBy(arrayOfCards, function (aPlayingCard) {
            return aPlayingCard.rank();
        });
        pairs = _.select(groups, function (array) {
            return array.length > 1
        });
        highestPair = _.max(pairs, function (array) {
            return array[0].weight()
        });
        cards = _.first(highestPair, 2);
        kickers = _.reject(arrayOfCards, function (aPlayingCard) {
            return highestPair.indexOf(aPlayingCard) !== -1
        });
        kickers = _.sortBy(kickers, function (aPlayingCard) {
            return aPlayingCard.weight()
        });
        cards = cards.concat(_.last(kickers, 3).reverse());
    })
    ();

    this.setCards(cards);

    this.name = function () {
        return "One Pair"
    };

    this.strength = function () {
        return 2
    };
};
OnePairCombination.prototype = combination;
OnePairCombination.isPossibleWithCards = function (arrayOfCards) {
    var ranks = _.map(arrayOfCards, function (aPlayingCard) {
        return aPlayingCard.rank()
    });
    var groups = _.countBy(ranks);
    groups = _.select(groups, function (count) {
        return count > 1
    });
    return groups.length > 0;
};

TwoPairCombination = function (arrayOfCards) {
    var cards = [];

    (function () {
        var groups, pairs, kickers;

        groups = _.groupBy(arrayOfCards, function (aPlayingCard) {
            return aPlayingCard.rank();
        });
        pairs = _.select(groups, function (array) {
            return array.length > 1
        });

        _.each(pairs, function (a) {
            cards = cards.concat(a)
        });

        cards = _.sortBy(cards, function (aPlayingCard) {
            aPlayingCard.weight()
        });

        cards = _.last(cards, 4).reverse();
        kickers = _.reject(arrayOfCards, function (aPlayingCard) {
            return cards.indexOf(aPlayingCard) !== -1
        });

        kickers = _.sortBy(kickers, function (aPlayingCard) {
            return aPlayingCard.weight()
        });
        cards.push(_.last(kickers));
    })();
    this.setCards(cards);

    this.name = function () {
        return "Two Pair"
    };

    this.strength = function () {
        return 3
    };
};
TwoPairCombination.prototype = combination;
TwoPairCombination.isPossibleWithCards = function (arrayOfCards) {
    var ranks = _.map(arrayOfCards, function (aPlayingCard) {
        return aPlayingCard.rank()
    });
    var groups = _.countBy(ranks);
    groups = _.select(groups, function (count) {
        return count > 1
    });
    if (groups.length === 1) {
        return groups[0] === 4
    }
    return groups.length > 1;
};

ThreeOfKindCombination = function (arrayOfCards) {
    var cards;

    (function () {
        var sortedCards, uniqCards, row, i;

        sortedCards = _.sortBy(arrayOfCards, function (aPlayingCard) {
            return aPlayingCard.weight()
        });
        sortedCards = sortedCards.reverse();
        uniqCards = _.uniq(sortedCards, function (aPlayingCard) {
            return aPlayingCard.rank()
        });

        //finding three at row
        row = [uniqCards[0]];
        for (i = 1; i < uniqCards.length; i++) {
            if ((_.last(row).weight()) === uniqCards[i].weight() + 1) {
                row.push(uniqCards[i]);
                if (row.length === 3) {
                    break
                }
            }
            else {
                row = [uniqCards[i]];
            }
        }
        cards = row;

        // add kickers
        sortedCards = _.reject(sortedCards, function (aPlayingCard) {
            return cards.indexOf(aPlayingCard) !== -1
        });
        cards = cards.concat(_.first(sortedCards, 2));
    })();

    this.setCards(cards);

    this.name = function () {
        return "Three of kind"
    };

    this.strength = function () {
        return 4
    };
};
ThreeOfKindCombination.prototype = combination;
ThreeOfKindCombination.isPossibleWithCards = function (arrayOfCards) {
    var cards, i;
    cards = _.sortBy(arrayOfCards, function (aPlayingCard) {
        return aPlayingCard.weight()
    });

    cards = _.uniq(cards, function (aPlayingCard) {
        return aPlayingCard.rank()
    });

    for (i = 0; i <= cards.length - 3; i++) {
        if (isSequence(cards.slice(i, i + 3), function (aPlayingCard) {
                return aPlayingCard.weight()
            })) {
            return true
        }
    }
    return false
};

StraightCombination = function (arrayOfCards) {
    var cards = [];

    (function () {
        var sortedCards, reversedCards, i;
        sortedCards = _.sortBy(arrayOfCards, function (aPlayingCard) {
            return aPlayingCard.weight()
        });
        sortedCards = _.uniq(sortedCards, function (aPlayingCard) {
            return aPlayingCard.rank()
        });

        reversedCards = sortedCards.slice().reverse();
        for (i = 0; i <= reversedCards.length - 5; i++) {
            if (isSequence(reversedCards.slice(i, i + 5), function (aPlayingCard) {
                    return aPlayingCard.weight()
                })) {
                cards = reversedCards.slice(i, i + 5);
                break
            }
        }
        if (cards.length === 0) {
            // build the lowest straight
            cards = sortedCards.slice(0, 4).reverse();
            cards.push(_.last(sortedCards))
        }
    })();

    this.setCards(cards);

    this.name = function () {
        return "Straight"
    };

    this.strength = function () {
        return 5
    };
};
StraightCombination.prototype = combination;
StraightCombination.isPossibleWithCards = function (arrayOfCards) {
    var cards, i;
    cards = _.sortBy(arrayOfCards, function (aPlayingCard) {
        return aPlayingCard.weight()
    });
    cards = _.uniq(cards, function (aPlayingCard) {
        return aPlayingCard.rank()
    });

    for (i = 0; i <= cards.length - 5; i++) {
        if (isSequence(cards.slice(i, i + 5), function (aPlayingCard) {
                return aPlayingCard.weight()
            })) {
            return true
        }
    }
    // checking for the lowest straight
    if (!isSequence(cards.slice(0, 4), function (aPlayingCard) {
            return aPlayingCard.weight()
        })) {
        return false
    }

    if (cards[0].rank() !== PlayingCard.rank.two) {
        return false
    }

    return (_.last(cards).rank() === PlayingCard.rank.ace)
};

FlashCombination = function (arrayOfCards) {
    var cards = [];

    (function () {
        var groups;

        if ((!arrayOfCards) || arrayOfCards.length === 0) {
            return
        }

        groups = _.groupBy(arrayOfCards, function (aPlayingCard) {
            return aPlayingCard.suit()
        });
        cards = _.max(groups, function (array) {
            return array.length
        });
        cards = _.sortBy(cards, function (aPlayingCard) {
            return aPlayingCard.weight()
        });
        cards = cards.reverse().slice(0, 5);
    })();

    this.setCards(cards);

    this.name = function () {
        return "Flash"
    };

    this.strength = function () {
        return 6
    };
};
FlashCombination.prototype = combination;
FlashCombination.isPossibleWithCards = function (arrayOfCards) {
    var suits = _.map(arrayOfCards, function (aPlayingCard) {
        return aPlayingCard.suit()
    });
    var groups = _.countBy(suits);
    return _.some(groups, function (count) {
        return count >= 5
    });
};

combination.allCombinations = [];
combination.allCombinations.push(HighCardCombination);
combination.allCombinations.push(OnePairCombination);
combination.allCombinations.push(TwoPairCombination);
combination.allCombinations.push(ThreeOfKindCombination);
combination.allCombinations.push(StraightCombination);
combination.allCombinations.push(FlashCombination);