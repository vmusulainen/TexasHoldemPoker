describe("Player", function () {

    it("reset() should remove all cards from personal cards", function () {
        var player = new Player("Player");
        player.addPersonalCard(new PlayingCard(PlayingCard.rank.ace, PlayingCard.suit.clubs));

        expect(player.personalCards().length).toEqual(1);

        player.reset();
        expect(player.personalCards().length).toEqual(0);
    });
});
