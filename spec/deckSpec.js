describe("Deck", function () {

    it("should create 52 cards on object creation", function () {
        var deck = new Deck();
        expect(deck.playingCards().length).toEqual(52);
    });

    it("getPlayingCard() should remove gotten card from deck", function () {
        var deck = new Deck();
        var card = deck.getPlayingCard();
        expect(deck.playingCards().indexOf(card)).toEqual(-1);
    });


});
