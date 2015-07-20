require 'card_combination'

class Straight < CardCombination

  def self.sequence?(array_of_cards)

    return false if array_of_cards.empty?

    return true if array_of_cards.size == 1

    if (yield array_of_cards.first) <= (yield array_of_cards.last)
      (array_of_cards.size - 1).times { |idx|
        a = yield array_of_cards[idx]
        b = yield array_of_cards[idx + 1]
        if (a + 1) != b
          return false
        end
      }
      return true
    else
      temp = array_of_cards.reverse
      (temp.size - 1).times { |idx|
        a = yield temp[idx]
        b = yield temp[idx + 1]
        if (a + 1) != b
          return false
        end
      }
      return true
    end
  end

  def self.possible_with_cards(array_of_cards)
    cards = []
    array_of_cards.each { |card| cards << card unless cards.any? { |each| card.rank == each.rank } }
    cards.sort!
    (cards.size - 5).times { |idx|
      if sequence?(cards.slice(idx, 5)) { |card| card.weight }
        return true
      end
    }

    return unless sequence?(cards.slice(0, 4)) { |card| card.weight }

    return unless cards.first.rank == Card.rank[:two]

    return cards.last.rank == Card.rank[:ace]

  end

  def initialize(array_of_cards)
    super array_of_cards

    cards = []
    array_of_cards.each { |card| cards << card unless cards.any? { |each| card.rank == each.rank } }
    cards.sort!
    (cards.size - 4).times { |idx|
      if self.class.sequence?(cards.reverse.slice(idx, 5)) { |card| card.weight }
        @cards = cards.reverse.slice(idx, 5)
        return
      end
    }

    @cards = cards.slice(0, 4).reverse
    @cards << cards.last
  end

  def name
    'Straight'
  end

  def strength
    5
  end

end