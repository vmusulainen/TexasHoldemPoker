describe("StraightCombination", function () {
    var rank = PlayingCard.rank;

    it("should return strength equal 5", function () {
        var combination = new StraightCombination();
        expect(combination.strength()).toEqual(5);
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

        expect(StraightCombination.isPossibleWithCards(cards)).toEqual(false);
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

        expect(StraightCombination.isPossibleWithCards(cards)).toEqual(false);
    });

    it("shouldn't be possible if suggested cards contain three in row", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));
        cards.push(new PlayingCard(rank.ten, null));
        cards.push(new PlayingCard(rank.jack, null));

        expect(StraightCombination.isPossibleWithCards(cards)).toEqual(false);
    });

    it("shouldn't be possible if suggested cards contain four in row", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));
        cards.push(new PlayingCard(rank.nine, null));
        cards.push(new PlayingCard(rank.jack, null));

        expect(StraightCombination.isPossibleWithCards(cards)).toEqual(false);
    });

    it("shouldn't be possible if suggested cards don't have the lowest sequence", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.eight, null));
        cards.push(new PlayingCard(rank.nine, null));
        cards.push(new PlayingCard(rank.ace, null));

        expect(StraightCombination.isPossibleWithCards(cards)).toEqual(false);
    });

    it("should be possible if suggested cards contain five in row", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));
        cards.push(new PlayingCard(rank.nine, null));
        cards.push(new PlayingCard(rank.ten, null));

        expect(StraightCombination.isPossibleWithCards(cards)).toEqual(true);
    });

    it("should be possible if suggested cards contain five in row beginning from Ace", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));
        cards.push(new PlayingCard(rank.ace, null));

        expect(StraightCombination.isPossibleWithCards(cards)).toEqual(true);
    });

    it("should select only five cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));
        cards.push(new PlayingCard(rank.nine, null));
        cards.push(new PlayingCard(rank.ten, null));

        var combination = new StraightCombination(cards);
        expect(combination.getCards().length).toEqual(5);
    });

    it("should select the highest sequence from cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));
        cards.push(new PlayingCard(rank.nine, null));

        var combination = new StraightCombination(cards);
        console.table(combination.getCards());
        expect(combination.getCards()[0].rank()).toEqual(rank.nine);
        expect(combination.getCards()[1].rank()).toEqual(rank.eight);
        expect(combination.getCards()[2].rank()).toEqual(rank.seven);
        expect(combination.getCards()[3].rank()).toEqual(rank.six);
        expect(combination.getCards()[4].rank()).toEqual(rank.five);
    });

    it("should select the sequence beginning from Ace from cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.nine, null));
        cards.push(new PlayingCard(rank.ace, null));

        var combination = new StraightCombination(cards);
        expect(combination.getCards()[0].rank()).toEqual(rank.five);
        expect(combination.getCards()[1].rank()).toEqual(rank.four);
        expect(combination.getCards()[2].rank()).toEqual(rank.three);
        expect(combination.getCards()[3].rank()).toEqual(rank.two);
        expect(combination.getCards()[4].rank()).toEqual(rank.ace);
    });

    describe("Some special cases", function () {
        it("should select the sequence beginning from Ace from cards", function () {
            var cards = [];
            cards.push(new PlayingCard(rank.two, null));
            cards.push(new PlayingCard(rank.four, null));
            cards.push(new PlayingCard(rank.five, null));
            cards.push(new PlayingCard(rank.jack, null));
            cards.push(new PlayingCard(rank.ace, null));
            cards.push(new PlayingCard(rank.three, null));
            cards.push(new PlayingCard(rank.three, null));

            var combination = new StraightCombination(cards);
            expect(combination.getCards().length).toEqual(5);
            expect(combination.getCards()[0].rank()).toEqual(rank.five);
            expect(combination.getCards()[1].rank()).toEqual(rank.four);
            expect(combination.getCards()[2].rank()).toEqual(rank.three);
            expect(combination.getCards()[3].rank()).toEqual(rank.two);
            expect(combination.getCards()[4].rank()).toEqual(rank.ace);
        });
    });
});
