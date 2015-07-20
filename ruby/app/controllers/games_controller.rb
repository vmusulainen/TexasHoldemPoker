class GamesController < ApplicationController
  helper_method :common_cards
  helper_method :players
  helper_method :player_cards
  helper_method :player_card_combinations
  helper_method :player_panel_class
  helper_method :player_panel_title

  def index


  end

  def new_game
    game = Game.new
    game.save
    redirect_to action: 'show', id: game.id
  end

  def open
    @game = Game.find(params[:id])
  end



  def show
    # For URL like /game/1
    # Get the game with id = 1
    @game = Game.find(params[:id])
  end

  def player_cards(player)
    @game.player_cards(player).sort.reverse
  end

  def player_card_combinations(player)
    @game.player_card_combinations(player).sort!.reverse
  end

  def players
    @game.players
  end

  def common_cards
    @game.common_cards.sort.reverse
  end

  def player_panel_class(player)
    @game.player_winner?(player) ? 'panel-success' : 'panel-default'
  end

  def player_panel_title(player)
    @game.player_winner?(player) ? player + ' - WINNER!' : player
  end

end