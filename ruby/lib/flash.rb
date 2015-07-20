require 'card_combination'

class Flash < CardCombination

  def self.possible_with_cards(array_of_cards)
    groups = array_of_cards.group_by { |each| each.suit }
    return groups.values.any? { |each| each.size >= 5 }
  end

  def initialize(array_of_cards)
    super array_of_cards

    groups = array_of_cards.group_by { |each| each.suit }
    temp = groups.values.detect { |each| each.size >= 5 }
    @cards = temp.sort.reverse.first(5)
  end

  def name
    'Flash'
  end

  def strength
    6
  end

end