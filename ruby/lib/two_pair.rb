require 'card_combination'

class TwoPair < CardCombination
  def self.possible_with_cards(array_of_cards)
    groups = array_of_cards.group_by { |card| card.rank }
    groups = groups.values.select { |each| each.size >= 2 }
    return true if groups.any? { |each| each.size >= 4 }
    groups.size >= 2
  end

  def initialize(array_of_cards)
    super(array_of_cards)

    groups = array_of_cards.group_by { |card| card.rank }
    groups = groups.values.select { |each| each.size >= 2 }
    temp = groups.inject([]) {|memo, each| memo + each.first(2)}
    temp = temp.sort!.last(4).reverse
    kickers = array_of_cards.reject { |card| temp.include?(card) }
    kickers.sort!
    @cards = temp << kickers.last
  end

  def name
    'Two Pair'
  end

  def strength
    3
  end

end