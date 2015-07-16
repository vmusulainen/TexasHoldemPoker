# General
The application is emulator of Texas Hold'em Poker.

The application was written as exercise from potential employer.

Exercise requirements are: 

* No bids
* Card combinations are Flash, Straight, Three of kind, Two pairs, Pair, High card.

The application uses following lib/frameworks:

* jquery for manipulations with DOM; 
* underscorejs for work with collections;
* twitter bootstrap as html/css framework;
* jasminejs as testing framework;

Exercise doesn't specify app UI, so I did not spend time on nice look.


# Installation
Just clone repository.

# Run
Open main.html file. Press button "Play" for step-by-step game or "Auto play 1000 times" for playing automatically.

Pay attention to showing of possible card combinations for every player in step-by-step game. It allows to check why player is winner.

Open specRunner.html for start tests.

#Design

* main.js - some code for start the application and rendering UI
* game.js - managing game stages, compares players' highest combinations for detecting the winner.
* playingCard.js - Playing card implementation (holds suit and rank, compares itself with another cards, calculates weight etc)
* deck.js - Deck of Playing cards implementation (shuffles cards, gives random cards)
* player.js - Player implementation (holds personal cards, select the highest card combination)
* combinations.js - Card combinations (chooses the best combination form personal cards and common cards, can compare itself with another combination )


# Advantages

The application design allows to append new card combination like Flash Royal etc. Just create new card combination
object and specify several it's methods. Add new combination to combination.allCombinations array. See combinations.js

Also you can easy increase player count - just modify Game.playerCount property. Be careful - a poker deck have just 52 cards.

# Disadvantages

Game.js has ugly logic for detecting game's winner.

Card combinations in combinations.js may have better inheritance design.

It needs to refactor code for rendering UI.

Also, I think requirejs is needed. 
 
No full test coverage. 