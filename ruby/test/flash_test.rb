require 'test/unit'
require 'flash'

class FlashTest < Test::Unit::TestCase

  def test_creation_throw_error_for_unappropriated_cards
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:four], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:six], :suit => Card.suit[:spades]})
    cards << Card.new({:rank => Card.rank[:eight], :suit => Card.suit[:spades]})
    cards << Card.new({:rank => Card.rank[:ten], :suit => Card.suit[:spades]})
    cards << Card.new({:rank => Card.rank[:queen], :suit => Card.suit[:hearth]})
    cards << Card.new({:rank => Card.rank[:ace], :suit => Card.suit[:hearth]})
    cards.shuffle!
    assert_raises { Flash.new(cards) }
  end

  def test_strength
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:four], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:six], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:eight], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:ten], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:queen], :suit => Card.suit[:hearth]})
    cards << Card.new({:rank => Card.rank[:ace], :suit => Card.suit[:hearth]})
    cards.shuffle!
    combination = Flash.new(cards)
    assert_equal(6, combination.strength)
  end

  def test_should_be_possible_if_cards_contain_5__cards_with_same_suit
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:four], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:six], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:eight], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:ten], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:queen], :suit => Card.suit[:hearth]})
    cards << Card.new({:rank => Card.rank[:ace], :suit => Card.suit[:hearth]})
    cards.shuffle!
    assert(Flash.possible_with_cards(cards))
  end

  def test_should_select_only_five_cards
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:four], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:six], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:eight], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:ten], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:queen], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:ace], :suit => Card.suit[:diamonds]})
    cards.shuffle!

    c = Flash.new(cards)
    assert_equal(5, c.cards.size)
  end

  def test_cards
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:four], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:six], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:eight], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:ten], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:queen], :suit => Card.suit[:diamonds]})
    cards << Card.new({:rank => Card.rank[:ace], :suit => Card.suit[:diamonds]})
    cards.shuffle!

    c = Flash.new(cards)
    assert_equal(Card.rank[:ace], c.cards[0].rank)
    assert_equal(Card.rank[:queen], c.cards[1].rank)
    assert_equal(Card.rank[:ten], c.cards[2].rank)
    assert_equal(Card.rank[:eight], c.cards[3].rank)
    assert_equal(Card.rank[:six], c.cards[4].rank)
  end

end