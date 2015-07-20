class Deck < Object

  attr_accessor :rank, :suit

  def initialize
    @playing_cards = []
    Card.suit.values.each { |suit|
      Card.rank.values.each { |rank|
        @playing_cards << Card.new({:rank => rank, :suit => suit})
      }
    }
    self.shuffle
  end

  def playing_cards
    @playing_cards
  end

  def get_playing_card
    card = @playing_cards.sample
    @playing_cards.delete(card)
    card
  end

  def shuffle
    @playing_cards.shuffle
  end
end