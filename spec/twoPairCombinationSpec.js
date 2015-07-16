describe("TwoPairCombination", function () {

    var rank = PlayingCard.rank;
    it("should have strength equal 3", function () {
        var combination = new TwoPairCombination([]);
        expect(combination.strength()).toEqual(3);
    });

    it("shouldn't be possible if suggested cards don't any pairs with same rank", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));
        expect(TwoPairCombination.isPossibleWithCards(cards)).toEqual(false);
    });

    it("shouldn't be possible if suggested cards contain 2 cards with same rank", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        expect(TwoPairCombination.isPossibleWithCards(cards)).toEqual(false);
    });

    it("shouldn't be possible if suggested cards contain 3 cards with same rank", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        expect(TwoPairCombination.isPossibleWithCards(cards)).toEqual(false);
    });

    it("should be possible if suggested cards contain 2 + 2 with same rank", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        expect(TwoPairCombination.isPossibleWithCards(cards)).toEqual(true);
    });

    it("should be possible only if suggested cards contain 2 + 3 cards with same rank", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        expect(TwoPairCombination.isPossibleWithCards(cards)).toEqual(true);
    });

    it("should be possible only if suggested cards contain 4 cards with same rank", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        expect(TwoPairCombination.isPossibleWithCards(cards)).toEqual(true);
    });

    it("should select only five cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.seven, null));

        var combination = new TwoPairCombination(cards);
        expect(combination.getCards().length).toEqual(5);
    });

    it("should choose two pair from cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.seven, null));

        var combination = new TwoPairCombination(cards);
        expect(combination.getCards()[0].rank()).toEqual(rank.seven);
        expect(combination.getCards()[1].rank()).toEqual(rank.seven);
        expect(combination.getCards()[2].rank()).toEqual(rank.two);
        expect(combination.getCards()[3].rank()).toEqual(rank.two);
    });

    it("should choose two the highest pair from cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.seven, null));

        var combination = new TwoPairCombination(cards);
        expect(combination.getCards()[0].rank()).toEqual(rank.seven);
        expect(combination.getCards()[1].rank()).toEqual(rank.seven);
        expect(combination.getCards()[2].rank()).toEqual(rank.six);
        expect(combination.getCards()[3].rank()).toEqual(rank.six);
    });

    it("should choose the kickers from the highest cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.seven, null));

        var combination = new TwoPairCombination(cards);
        expect(combination.getCards()[4].rank()).toEqual(rank.six);
    });

    describe("compare()", function () {
        var rank = PlayingCard.rank,
            stub = {},
            combinationA, combinationB,
            cardSetA, cardSetB;

        stub.strength = function () {
            return this._strength
        };
        stub.getCards = function () {
            return _.sortBy(this._cards, function (aPlayingCard) {
                return aPlayingCard.weight()
            }).reverse();
        };

        beforeEach(function () {
            var cards = [];
            cards.push(new PlayingCard(rank.two, null));
            cards.push(new PlayingCard(rank.three, null));
            cards.push(new PlayingCard(rank.four, null));
            cards.push(new PlayingCard(rank.five, null));
            cards.push(new PlayingCard(rank.seven, null));
            cardSetA = cards.slice();
            cardSetB = cards.slice();
        });

        it("should return 1 if the combination is more strength", function () {
            var stub = {};
            cardSetA.push(new PlayingCard(rank.two, null));
            cardSetA.push(new PlayingCard(rank.three, null));
            combinationA = new TwoPairCombination(cardSetA);
            stub.strength = function(){return combinationA.strength() - 1};
            expect(combinationA.compare(stub)).toEqual(1);
        });

        it("should return -1 if the combination is less strength ", function () {
            var stub = {};
            cardSetA.push(new PlayingCard(rank.two, null));
            cardSetA.push(new PlayingCard(rank.three, null));
            combinationA = new TwoPairCombination(cardSetA);
            stub.strength = function(){return combinationA.strength() + 1};
            expect(combinationA.compare(stub)).toEqual(-1);
        });

        it("should return -1 if the combination has lower cards", function () {
            cardSetA.push(new PlayingCard(rank.two, null));
            cardSetA.push(new PlayingCard(rank.three, null));
            cardSetB.push(new PlayingCard(rank.three, null));
            cardSetB.push(new PlayingCard(rank.four, null));

            combinationA = new TwoPairCombination(cardSetA);
            combinationB = new TwoPairCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(-1);
        });

        it("should return 1 if the combination has higher cards", function () {
            cardSetA.push(new PlayingCard(rank.three, null));
            cardSetA.push(new PlayingCard(rank.four, null));
            cardSetB.push(new PlayingCard(rank.two, null));
            cardSetB.push(new PlayingCard(rank.three, null));

            combinationA = new TwoPairCombination(cardSetA);
            combinationB = new TwoPairCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(1);
        });

        it("should return -1 if the combination has lower kicker card", function () {
            cardSetA.push(new PlayingCard(rank.three, null));
            cardSetA.push(new PlayingCard(rank.four, null));
            cardSetB.push(new PlayingCard(rank.three, null));
            cardSetB.push(new PlayingCard(rank.four, null));
            cardSetB[0] = new PlayingCard(rank.ace, null);

            combinationA = new TwoPairCombination(cardSetA);
            combinationB = new TwoPairCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(-1);
        });

        it("should return 1 if the combination has higher kicker card", function () {
            cardSetA.push(new PlayingCard(rank.three, null));
            cardSetA.push(new PlayingCard(rank.four, null));
            cardSetA[0] = new PlayingCard(rank.ace, null);
            cardSetB.push(new PlayingCard(rank.three, null));
            cardSetB.push(new PlayingCard(rank.four, null));

            combinationA = new TwoPairCombination(cardSetA);
            combinationB = new TwoPairCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(1);
        });

        it("should return 0 if the combination has same cards", function () {
            cardSetA.push(new PlayingCard(rank.three, null));
            cardSetA.push(new PlayingCard(rank.four, null));
            cardSetB.push(new PlayingCard(rank.three, null));
            cardSetB.push(new PlayingCard(rank.four, null));

            combinationA = new TwoPairCombination(cardSetA);
            combinationB = new TwoPairCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(0);
        });
    });
});
