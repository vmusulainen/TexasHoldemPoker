describe("FlashCombination", function () {
    var rank = PlayingCard.rank;
    var suit = PlayingCard.suit;

    it("should return strength equal 6", function () {
        var combination = new FlashCombination();
        expect(combination.strength()).toEqual(6);
    });

    it("shouldn't be possible if suggested cards don't contain any five cards same suit", function () {
        var cards = [];
        cards.push(new PlayingCard(null, suit.clubs));
        cards.push(new PlayingCard(null, suit.clubs));
        cards.push(new PlayingCard(null, suit.diamonds));
        cards.push(new PlayingCard(null, suit.diamonds));
        cards.push(new PlayingCard(null, suit.hearth));
        cards.push(new PlayingCard(null, suit.hearth));
        cards.push(new PlayingCard(null, suit.spades));
        expect(FlashCombination.isPossibleWithCards(cards)).toEqual(false);
    });

    it("should be possible if suggested cards contain any five cards same suit", function () {
        var cards = [];
        cards.push(new PlayingCard(null, suit.clubs));
        cards.push(new PlayingCard(null, suit.diamonds));
        cards.push(new PlayingCard(null, suit.diamonds));
        cards.push(new PlayingCard(null, suit.diamonds));
        cards.push(new PlayingCard(null, suit.diamonds));
        cards.push(new PlayingCard(null, suit.diamonds));
        cards.push(new PlayingCard(null, suit.spades));
        expect(FlashCombination.isPossibleWithCards(cards)).toEqual(true);
    });

    it("should select the highest sequence from cards", function () {
        var cards = [];
        cards.push(new PlayingCard(rank.two, suit.diamonds));
        cards.push(new PlayingCard(rank.three, suit.diamonds));
        cards.push(new PlayingCard(rank.four, suit.diamonds));
        cards.push(new PlayingCard(rank.five, suit.diamonds));
        cards.push(new PlayingCard(rank.six, suit.diamonds));
        cards.push(new PlayingCard(rank.seven, suit.diamonds));
        cards.push(new PlayingCard(rank.nine, suit.clubs));

        var combination = new FlashCombination(cards);
        expect(combination.getCards()[0].rank()).toEqual(rank.seven);
        expect(combination.getCards()[1].rank()).toEqual(rank.six);
        expect(combination.getCards()[2].rank()).toEqual(rank.five);
        expect(combination.getCards()[3].rank()).toEqual(rank.four);
        expect(combination.getCards()[4].rank()).toEqual(rank.three);
    });

    describe("Some special cases", function () {
        it("should sort cards", function () {
            var cards = [];
            cards.push(new PlayingCard(rank.two, suit.hearth));
            cards.push(new PlayingCard(rank.eight, suit.spades));
            cards.push(new PlayingCard(rank.nine, suit.hearth));
            cards.push(new PlayingCard(rank.jack, suit.spades));
            cards.push(new PlayingCard(rank.queen, suit.hearth));
            cards.push(new PlayingCard(rank.jack, suit.hearth));
            cards.push(new PlayingCard(rank.king, suit.hearth));

            var combination = new FlashCombination(cards);
            expect(combination.getCards()[0].rank()).toEqual(rank.king);
            expect(combination.getCards()[1].rank()).toEqual(rank.queen);
            expect(combination.getCards()[2].rank()).toEqual(rank.jack);
            expect(combination.getCards()[3].rank()).toEqual(rank.nine);
            expect(combination.getCards()[4].rank()).toEqual(rank.two);
        });
    });

});
