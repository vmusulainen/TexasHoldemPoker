describe("HighCardCombination", function () {
    var cards = _.map(PlayingCard.ranks, function (rank) {
        return new PlayingCard(rank, null)
    });
    _.shuffle(cards);

    it("should have strength equal 1", function () {
        var combination = new HighCardCombination(cards);
        expect(combination.strength()).toEqual(1);
    });

    it("should select five cards from given", function () {
        var combination = new HighCardCombination(cards);
        expect(combination.getCards().length).toEqual(5);
    });

    it("should select five the highest cards from given", function () {
        var combination = new HighCardCombination(cards);
        expect(combination.getCards()[0].rank()).toEqual(PlayingCard.rank.ace);
        expect(combination.getCards()[1].rank()).toEqual(PlayingCard.rank.king);
        expect(combination.getCards()[2].rank()).toEqual(PlayingCard.rank.queen);
        expect(combination.getCards()[3].rank()).toEqual(PlayingCard.rank.jack);
        expect(combination.getCards()[4].rank()).toEqual(PlayingCard.rank.ten);
    });

    describe("compare()", function () {
        var rank = PlayingCard.rank,
            combinationA, combinationB,
            cardSetA, cardSetB;
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

        it("should return 1 if the combination is more strength ", function () {
            var stub = {};
            combinationA = new HighCardCombination(cards);
            stub.strength = function(){return combinationA.strength() - 1};
            expect(combinationA.compare(stub)).toEqual(1);
        });

        it("should return -1 if the combination is more strength ", function () {
            var stub = {};
            combinationA = new HighCardCombination(cards);
            stub.strength = function(){return combinationA.strength() + 1};
            expect(combinationA.compare(stub)).toEqual(-1);
        });

        it("should return -1 if the combination has lower cards", function () {
            cardSetA.push(new PlayingCard(rank.king, null));
            cardSetB.push(new PlayingCard(rank.ace, null));

            combinationA = new HighCardCombination(cardSetA);
            combinationB = new HighCardCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(-1);
        });

        it("should return 1 if the combination has higher cards", function () {
            cardSetA.push(new PlayingCard(rank.ace, null));
            cardSetB.push(new PlayingCard(rank.king, null));

            combinationA = new HighCardCombination(cardSetA);
            combinationB = new HighCardCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(1);
        });

        it("should return 0 if the combination has same cards", function () {
            cardSetA.push(new PlayingCard(rank.ace, null));
            cardSetB.push(new PlayingCard(rank.ace, null));

            combinationA = new HighCardCombination(cardSetA);
            combinationB = new HighCardCombination(cardSetB);
            expect(combinationA.compare(combinationB)).toEqual(0);
        });
    });
});
