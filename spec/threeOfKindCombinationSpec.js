describe("ThreeOfKindCombination", function () {
    var rank = PlayingCard.rank;

    it("should return strength equal 4", function () {
        var combination = new ThreeOfKindCombination();
        expect(combination.strength()).toEqual(4);
    });

    it("shouldn't be possible if suggested cards don't contain any sequence in row", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.eight, null));
        cards.push(new PlayingCard(rank.ten, null));
        cards.push(new PlayingCard(rank.queen, null));
        cards.push(new PlayingCard(rank.ace, null));

        expect(ThreeOfKindCombination.isPossibleWithCards(cards)).toEqual(false);
    });

    it("shouldn't be possible if suggested cards contain two in row cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.eight, null));
        cards.push(new PlayingCard(rank.ten, null));
        cards.push(new PlayingCard(rank.queen, null));
        cards.push(new PlayingCard(rank.ace, null));

        expect(ThreeOfKindCombination.isPossibleWithCards(cards)).toEqual(false);
    });

    it("should be possible if suggested cards contain three in row", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));
        cards.push(new PlayingCard(rank.nine, null));
        cards.push(new PlayingCard(rank.ten, null));

        expect(ThreeOfKindCombination.isPossibleWithCards(cards)).toEqual(true);
    });

    it("should select only five cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));

        var combination = new ThreeOfKindCombination(cards);
        expect(combination.getCards().length).toEqual(5);
    });

    it("should choose the highest three in row from cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));

        var combination = new ThreeOfKindCombination(cards);
        expect(combination.getCards()[0].rank()).toEqual(rank.seven);
        expect(combination.getCards()[1].rank()).toEqual(rank.six);
        expect(combination.getCards()[2].rank()).toEqual(rank.five);
    });

    it("should choose the kickers from the highest cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.eight, null));

        var combination = new ThreeOfKindCombination(cards);
        expect(combination.getCards()[0].rank()).toEqual(rank.six);
        expect(combination.getCards()[1].rank()).toEqual(rank.five);
        expect(combination.getCards()[2].rank()).toEqual(rank.four);
        expect(combination.getCards()[3].rank()).toEqual(rank.eight);
        expect(combination.getCards()[4].rank()).toEqual(rank.five);
    });

    describe("Some special cases", function () {
        it("should be possible if suggested from cards have tree in row with duplicate", function () {
            var cards = [];
            cards.push(new PlayingCard(rank.eight, null));
            cards.push(new PlayingCard(rank.nine, null));
            cards.push(new PlayingCard(rank.jack, null));
            cards.push(new PlayingCard(rank.queen, null));
            cards.push(new PlayingCard(rank.king, null));
            cards.push(new PlayingCard(rank.three, null));
            cards.push(new PlayingCard(rank.queen, null));

            expect(ThreeOfKindCombination.isPossibleWithCards(cards)).toEqual(true);
        });

        it("should select the tree in row from cards with duplicated", function () {
            var cards = [];
            cards.push(new PlayingCard(rank.eight, null));
            cards.push(new PlayingCard(rank.nine, null));
            cards.push(new PlayingCard(rank.jack, null));
            cards.push(new PlayingCard(rank.queen, null));
            cards.push(new PlayingCard(rank.king, null));
            cards.push(new PlayingCard(rank.three, null));
            cards.push(new PlayingCard(rank.queen, null));

            var combination = new ThreeOfKindCombination(cards);
            expect(combination.getCards()[0].rank()).toEqual(rank.king);
            expect(combination.getCards()[1].rank()).toEqual(rank.queen);
            expect(combination.getCards()[2].rank()).toEqual(rank.jack);
            expect(combination.getCards()[3].rank()).toEqual(rank.queen);
            expect(combination.getCards()[4].rank()).toEqual(rank.nine);
        });
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
            cards.push(new PlayingCard(rank.six, null));
            cards.push(new PlayingCard(rank.eight, null));
            cards.push(new PlayingCard(rank.ten, null));
            cards.push(new PlayingCard(rank.queen, null));
            cardSetA = cards.slice();
            cardSetB = cards.slice();
        });

        it("should return 1 if the combination is more strength", function () {
            var stub = {};
            cardSetA.push(new PlayingCard(rank.two, null));
            cardSetA.push(new PlayingCard(rank.three, null));
            combinationA = new ThreeOfKindCombination(cardSetA);
            stub.strength = function(){return combinationA.strength() - 1};
            expect(combinationA.compare(stub)).toEqual(1);
        });

        it("should return -1 if the combination is less strength ", function () {
            var stub = {};
            cardSetA.push(new PlayingCard(rank.two, null));
            cardSetA.push(new PlayingCard(rank.three, null));
            combinationA = new ThreeOfKindCombination(cardSetA);
            stub.strength = function(){return combinationA.strength() + 1};
            expect(combinationA.compare(stub)).toEqual(-1);
        });

        it("should return -1 if the combination begins with lower cards", function () {
            cardSetB[3] = new PlayingCard(rank.five, null);

            combinationA = new ThreeOfKindCombination(cardSetA);
            combinationB = new ThreeOfKindCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(-1);
        });

        it("should return 1 if the combination begins higher cards", function () {
            cardSetA[3] = new PlayingCard(rank.five, null);

            combinationA = new ThreeOfKindCombination(cardSetA);
            combinationB = new ThreeOfKindCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(1);
        });

        it("should return -1 if the combination has lower kicker card", function () {
            cardSetA[6] = new PlayingCard(rank.jack, null);

            combinationA = new ThreeOfKindCombination(cardSetA);
            combinationB = new ThreeOfKindCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(-1);
        });

        it("should return 1 if the combination has higher kicker card", function () {
            cardSetB[6] = new PlayingCard(rank.jack, null);

            combinationA = new ThreeOfKindCombination(cardSetA);
            combinationB = new ThreeOfKindCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(1);
        });

        it("should return 0 if the combination has same cards", function () {
            combinationA = new ThreeOfKindCombination(cardSetA);
            combinationB = new ThreeOfKindCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(0);
        });
    });
});
