describe("PlayingCard", function () {
    describe("Weight", function () {
        it("should return 2 for playing card with rank \"Two\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.two, null);
            expect(playingCard.weight()).toEqual(2);
        });
        it("should return 3 for playing card with rank \"Three\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.three, null);
            expect(playingCard.weight()).toEqual(3);
        });
        it("should return 4 for playing card with rank \"Four\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.four, null);
            expect(playingCard.weight()).toEqual(4);
        });
        it("should return 5 for playing card with rank \"Five\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.five, null);
            expect(playingCard.weight()).toEqual(5);
        });
        it("should return 6 for playing card with rank \"Six\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.six, null);
            expect(playingCard.weight()).toEqual(6);
        });
        it("should return 7 for playing card with rank \"Seven\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.seven, null);
            expect(playingCard.weight()).toEqual(7);
        });
        it("should return 8 for playing card with rank \"Eight\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.eight, null);
            expect(playingCard.weight()).toEqual(8);
        });
        it("should return 9 for playing card with rank \"Nine\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.nine, null);
            expect(playingCard.weight()).toEqual(9);
        });
        it("should return 10 for playing card with rank \"Ten\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.ten, null);
            expect(playingCard.weight()).toEqual(10);
        });
        it("should return 11 for playing card with rank \"Jack\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.jack, null);
            expect(playingCard.weight()).toEqual(11);
        });
        it("should return 12 for playing card with rank \"Queen\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.queen, null);
            expect(playingCard.weight()).toEqual(12);
        });
        it("should return 13 for playing card with rank \"King\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.king, null);
            expect(playingCard.weight()).toEqual(13);
        });
        it("should return 14 for playing card with rank \"Ace\" of any suit", function () {
            var playingCard = new PlayingCard(PlayingCard.rank.ace, null);
            expect(playingCard.weight()).toEqual(14);
        });
    });

    describe("Comparing", function(){
        it("should return 0 it playing cards have same rank", function(){
        var cardA = new PlayingCard(PlayingCard.rank.two, null),
            cardB = new PlayingCard(PlayingCard.rank.two, null);
            expect(cardA.compare(cardB)).toEqual(0);
            expect(cardB.compare(cardA)).toEqual(0);
        });

        it("should return -1 it playing card has lower rank than another card", function(){
            var cardA = new PlayingCard(PlayingCard.rank.two, null),
                cardB = new PlayingCard(PlayingCard.rank.three, null);
            expect(cardA.compare(cardB)).toEqual(-1);
        });

        it("should return 1 it playing card has higher rank than another card", function(){
            var cardA = new PlayingCard(PlayingCard.rank.three, null),
                cardB = new PlayingCard(PlayingCard.rank.two, null);
            expect(cardA.compare(cardB)).toEqual(1);
        });


    });

    it("should be hidden by default", function(){
        var card = new PlayingCard(PlayingCard.rank.ace, PlayingCard.suit.clubs);
        expect(card.isHidden()).toEqual(true);
    });

    it("name() should return \"?\" for hidden card", function(){
        var card = new PlayingCard(PlayingCard.rank.ace, PlayingCard.suit.clubs);
        expect(card.name()).toEqual("?");
    });

    it("beOpened() should open playing card", function(){
        var card = new PlayingCard(PlayingCard.rank.ace, PlayingCard.suit.clubs);
        card.beOpened();
        expect(card.isHidden()).toEqual(false);
    });
});
