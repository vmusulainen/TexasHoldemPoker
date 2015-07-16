describe("isSequence", function () {

    it("should answer false for []", function () {
        expect(isSequence([], function (n) {
            return n
        })).toEqual(false);
    });

    it("should answer false for [1, 3]", function () {
        expect(isSequence([1, 3], function (n) {
            return n
        })).toEqual(false);
    });

    it("should answer false for [1, 2, 0]", function () {
        expect(isSequence([1, 2, 4], function (n) {
            return n
        })).toEqual(false);
    });

    it("should answer true for [1]", function () {
        expect(isSequence([1], function (n) {
            return n
        })).toEqual(true);
    });

    it("should answer true for [1, 2]", function () {
        expect(isSequence([1, 2], function (n) {
            return n
        })).toEqual(true);
    });

    it("should answer true for [1, 2, 3, 4, 5]", function () {
        expect(isSequence([1, 2], function (n) {
            return n
        })).toEqual(true);
    });

    it("should answer true for [2, 1]", function () {
        expect(isSequence([2, 1], function (n) {
            return n
        })).toEqual(true);
    });

    it("should answer true for card sequence", function () {
        var
            cards = [],
            rank = PlayingCard.rank;

        cards.push(new PlayingCard(rank.two, null));
        cards.push(new PlayingCard(rank.three, null));
        cards.push(new PlayingCard(rank.four, null));
        cards.push(new PlayingCard(rank.five, null));
        cards.push(new PlayingCard(rank.six, null));
        cards.push(new PlayingCard(rank.seven, null));
        cards.push(new PlayingCard(rank.eight, null));
        cards.push(new PlayingCard(rank.nine, null));

        expect(isSequence(cards, function (aPlayingCard) {
            return aPlayingCard.weight()
        })).toEqual(true);
    });


});
