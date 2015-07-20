require 'card_combination'

class ThreeOfKind < CardCombination
  def self.possible_with_cards(array_of_cards)
    groups = array_of_cards.group_by { |card| card.rank }
    groups = groups.values.select { |each| each.size >= 3 }
    groups.size >= 1
  end

  def initialize(array_of_cards)
    super(array_of_cards)

    groups = array_of_cards.group_by { |card| card.rank }
    groups = groups.values.select { |each| each.size >= 3 }
    temp = groups.inject([]) {|memo, each| memo + each}
    temp = temp.sort!.last(3)
    kickers = array_of_cards.reject { |card| temp.include?(card) }
    kickers.sort!.reverse!
    @cards = temp + kickers.first(2)
  end

  def name
    'Three Of Kind'
  end

  def strength
    4
  end

end