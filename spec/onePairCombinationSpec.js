describe("OnePairCombination", function () {
    var rank = PlayingCard.rank;

    it("should have strength equal 2", function () {
        var combination = new OnePairCombination();
        expect(combination.strength()).toEqual(2);
    });

    it("shouldn't be possible if suggested cards don't contain two or more cards with same rank", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));
        expect(OnePairCombination.isPossibleWithCards(cards)).toEqual(false);
    });

    it("should be possible if suggested cards contain two with same rank", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));
        expect(OnePairCombination.isPossibleWithCards(cards)).toEqual(true);
    });

    it("should be possible if suggested cards contain more than two with same rank", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.two, null));
        expect(OnePairCombination.isPossibleWithCards(cards)).toEqual(true);
    });

    it("should select only five cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));

        var combination = new OnePairCombination(cards);
        expect(combination.getCards().length).toEqual(5);
    });

    it("should select a pair from cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));

        var combination = new OnePairCombination(cards);
        expect(combination.getCards()[0].rank()).toEqual(rank.two);
        expect(combination.getCards()[1].rank()).toEqual(rank.two);
        expect(combination.getCards()[2].rank()).toEqual(rank.eight);
        expect(combination.getCards()[3].rank()).toEqual(rank.seven);
        expect(combination.getCards()[4].rank()).toEqual(rank.six);
    });

    it("should select only a pair if cards contain  more than two cards with same rank", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));

        var combination = new OnePairCombination(cards);
        expect(combination.getCards()[0].rank()).toEqual(rank.two);
        expect(combination.getCards()[1].rank()).toEqual(rank.two);
        expect(combination.getCards()[2].rank()).toEqual(rank.five);
        expect(combination.getCards()[3].rank()).toEqual(rank.four);
        expect(combination.getCards()[4].rank()).toEqual(rank.three);
    });

    it("should select the kickers from the highest cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.six, null));

        var combination = new OnePairCombination(cards);
        expect(combination.getCards()[2].rank()).toEqual(rank.seven);
        expect(combination.getCards()[3].rank()).toEqual(rank.four);
        expect(combination.getCards()[4].rank()).toEqual(rank.three);
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
            cards.push(new PlayingCard(rank.nine, null));
            cardSetA = cards.slice();
            cardSetB = cards.slice();
        });

        it("should return 1 if the combination is more strength", function () {
            var stub = {};
            cardSetA.push(new PlayingCard(rank.two, null));
            combinationA = new OnePairCombination(cardSetA);
            stub.strength = function(){return combinationA.strength() - 1};
            expect(combinationA.compare(stub)).toEqual(1);
        });

        it("should return -1 if the combination is less strength ", function () {
            var stub = {};
            cardSetA.push(new PlayingCard(rank.two, null));
            combinationA = new OnePairCombination(cardSetA);
            stub.strength = function(){return combinationA.strength() + 1};
            expect(combinationA.compare(stub)).toEqual(-1);
        });

        it("should return -1 if the combination has lower cards", function () {
            cardSetA.push(new PlayingCard(rank.two, null));
            cardSetB.push(new PlayingCard(rank.three, null));

            combinationA = new OnePairCombination(cardSetA);
            combinationB = new OnePairCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(-1);
        });

        it("should return 1 if the combination has higher cards", function () {
            cardSetA.push(new PlayingCard(rank.three, null));
            cardSetB.push(new PlayingCard(rank.two, null));

            combinationA = new OnePairCombination(cardSetA);
            combinationB = new OnePairCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(1);
        });

        it("should return 0 if the combination has same cards", function () {
            cardSetA.push(new PlayingCard(rank.two, null));
            cardSetB.push(new PlayingCard(rank.two, null));

            combinationA = new OnePairCombination(cardSetA);
            combinationB = new OnePairCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(0);
        });
    });
});
