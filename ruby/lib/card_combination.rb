class CardCombination

  def self.possible_with_cards(cards)
    raise 'it should be overridden by subclasses'
  end

  def self.descendants
    ObjectSpace.each_object(Class).select { |aClass| aClass < self }
  end

  def self.possible_combinations
    [HighCard]
  end

  def self.all_possible_combinations_with_cards(array_of_cards)
    self.possible_combinations.select { |each| each.possible_with_cards(array_of_cards) }
  end

  def initialize(array_of_cards)
    raise 'Cannot create combination on this cards' unless self.class.possible_with_cards(array_of_cards)
    @cards = []
  end

  def cards
    @cards
  end

  def name
    raise 'it should be overridden by subclasses'
  end

  def strength
    raise 'it should be overridden by subclasses'
  end

  def <=> (aCombination)
    if self.strength < aCombination.strength
      return -1
    end

    if self.strength > aCombination.strength
      return 1
    end

    5.times { |idx|
      result = @cards[idx] <=> aCombination.cards[idx]
      if result != 0
        return result
      end
    }
    0
  end

end