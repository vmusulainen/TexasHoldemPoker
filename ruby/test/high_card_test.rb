require 'test/unit'
require 'high_card'
require 'deck'

class HighCardTest < Test::Unit::TestCase

  # Called before every test method runs. Can be used
  # to set up fixture information.
  def setup
    @cards = []
    @cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    @cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    @cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    @cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    @cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    @cards << Card.new({:rank => Card.rank[:seven], :suit => nil})
    @cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    @cards.shuffle!
    @card_set_a = @cards.dup
    @card_set_b = @cards.dup
  end

  # Called after every test method runs. Can be used to tear
  # down fixture information.

  def teardown
    # Do nothing
  end

  def test_strength
    combination = HighCard.new(@cards)
    assert_equal(1, combination.strength)
  end

  def test_select_five_cards_from_given
    combination = HighCard.new(@cards)
    assert_equal(5, combination.cards.size)
  end

  def test_select_the_highest_five_cards_from_given
    combination = HighCard.new(@cards)
    assert_equal(Card.rank[:eight], combination.cards[0].rank)
    assert_equal(Card.rank[:seven], combination.cards[1].rank)
    assert_equal(Card.rank[:six], combination.cards[2].rank)
    assert_equal(Card.rank[:five], combination.cards[3].rank)
    assert_equal(Card.rank[:four], combination.cards[4].rank)
  end

  def test_comparing
    assert_equal(0, HighCard.new(@card_set_a) <=> HighCard.new(@card_set_b))

    @card_set_a << (Card.new({:rank => Card.rank[:king], :suit => nil}))
    @card_set_b << (Card.new({:rank => Card.rank[:ace], :suit => nil}))

    assert_equal(-1, HighCard.new(@card_set_a) <=> HighCard.new(@card_set_b))
    assert_equal(1, HighCard.new(@card_set_b) <=> HighCard.new(@card_set_a))
  end
end