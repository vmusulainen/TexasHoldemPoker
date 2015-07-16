var game = new Game();

var gameStep = function () {
    game.run();
    renderGame(game);
};

var autoPlay = function () {
    var i,
        autoGame,
        desk = $("#desk");

    desk.empty();
    for (i = 0; i <= 1000; i++) {
        var result;
        autoGame = new Game();
        autoGame.run();
        autoGame.run();
        result = "Game: " + i + "; ";
        result = result + "Common Cards: ";
        _.each(autoGame.commonCards(), function (aPlayingCard) {
            result = result + aPlayingCard.name() + " | "
        });
        result = result + "; ";

        _.each(autoGame.players(), function (aPlayer) {
            result = result + aPlayer.name() + ": ";
            _.each(aPlayer.personalCards(), function (aPlayingCard) {
                result = result + aPlayingCard.name() + " | "
            });
            result = result + "; ";
        });
        result = result + "Winner: ";
        if (autoGame.hasWinner()) {
            result = result + autoGame.winner().name() + " ";
            result = result + "with: ";
            _.each(autoGame.winner().highestCombination().getCards(), function (aPlayingCard) {
                result = result + aPlayingCard.name() + " | "
            });
            result = result + ";";
        }
        else {
            result = result + " none"
        }
        desk.append($("<div>").css({"font-size": "10px"}).text(result));
    }
};

function renderGame() {
    var desk;
    var Panel = function () {
        var elements = [];
        this.title = "Panel title";
        this.style = "default";
        this.addElement = function (element) {
            elements.push(element)
        };
        this.appendTo = function (element) {
            var pnl, header, body;
            pnl = $("<div>");
            pnl.addClass("panel");
            pnl.addClass("panel-" + this.style);
            header = $("<div>");
            header.addClass("panel-heading");
            header.append($("<h3>").addClass("panel-title").text(this.title));
            pnl.append(header);
            body = $("<div>");
            body.addClass("panel-body");
            body.append(elements);
            pnl.append(body);
            element.append(pnl)
        }
    };

    desk = $("#desk");
    desk.empty();

    // rendering common cards
    (function () {
        var panel = new Panel(),
            cardContainer = $("<h4>");
        _.each(game.commonCards(), function (aPlayingCard) {
            var element = $("<span>");
            element.addClass("label label-info");
            element.text(aPlayingCard.name());
            cardContainer.append(element);
            cardContainer.append(" ");
        });
        panel.title = "Common Cards";
        panel.addElement(cardContainer);
        panel.appendTo(desk);
    })();

    // rendering information for every player
    if ((game.isFinished()) && (!game.hasWinner())) {
        desk.append($("<h1>").text("No Winner!"));
    }
    (function () {
        _.each(game.players(), function (aPlayer) {
            var panel = new Panel();

            // set style and title of player panel
            if ((game.hasWinner()) && (game.winner() === aPlayer)) {
                panel.style = "success";
                panel.title = aPlayer.name() + ' - WINNER!';
            }
            else {
                panel.title = aPlayer.name();
            }

            // rendering player's personal cards
            (function () {
                var cardContainer = $("<h4>");
                _.each(aPlayer.personalCards(), function (aPlayingCard) {
                    var element = $("<span>");
                    element.addClass("label label-info");
                    element.text(aPlayingCard.name());
                    cardContainer.append(element);
                    cardContainer.append(" ");
                });
                panel.addElement($("<div>").addClass("col-md-2").append(cardContainer));
            })();

            // rendering player's possible card combinations
            var column = $("<div>");
            column.addClass("col-md-10");

            _.each(aPlayer.possibleCardCombinations(), function (aCombination) {
                var row = $("<div>").addClass("row"),
                    cardContainer = $("<div>");
                row.append($("<div>").addClass("col-md-2").text(aCombination.name()));
                _.each(aCombination.getCards(), function (aPlayingCard) {
                    var element = $("<span>");
                    element.addClass("label");
                    if (aPlayer.personalCards().indexOf(aPlayingCard) !== -1) {
                        element.addClass("label-info")
                    }
                    else {
                        element.addClass("label-default")
                    }
                    element.text(aPlayingCard.name());
                    cardContainer.append(element);
                    cardContainer.append(" ");
                });
                row.append($("<div>").addClass("col-md-10").append(cardContainer));
                column.append(row);

            });
            panel.addElement(column);
            panel.appendTo(desk);
        });
    })();

    $("#button").text(game.run.label);
}
