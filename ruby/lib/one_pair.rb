require 'card_combination'

class OnePair < CardCombination
  def self.possible_with_cards(array_of_cards)
    ranks = array_of_cards.collect { |card| card.rank }
    ranks.to_set.size < ranks.size
  end

  def initialize(array_of_cards)
    super(array_of_cards)

    temp = array_of_cards.select { |card| array_of_cards.count { |each| each.rank == card.rank } > 1 }
    temp.sort!
    temp = (array_of_cards.select {|each| each.rank == temp.last.rank}).first(2)
    kickers = array_of_cards.reject {|card| temp.include?(card)}
    kickers.sort!
    @cards = temp + kickers.last(3).reverse
  end

  def name
    'One Pair'
  end

  def strength
    2
  end

end