require 'card_combination'

class HighCard < CardCombination
  def self.possible_with_cards(cards)
    true
  end

  def initialize(array_of_cards)
    super(array_of_cards)
    temp = array_of_cards.sort
    @cards = temp.last(5).reverse
  end

  def name
    'High Card'
  end

  def strength
    1
  end

end