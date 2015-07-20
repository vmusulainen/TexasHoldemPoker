require 'test/unit'
require 'one_pair'

class OnePairTest < Test::Unit::TestCase

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

  def test_creation_throw_error_for_unappropriated_cards
    assert_raises { OnePair.new(@cards) }
  end

  def test_strength
    @card_set_a << Card.new({:rank => Card.rank[:two], :suit => nil})
    combination = OnePair.new(@card_set_a)
    assert_equal(2, combination.strength)
  end

  def test_should_not_be_possible_if_cards_do_not_contain_two_or_more_cards_with_same_rank
    assert !(OnePair.possible_with_cards(@cards))
  end

  def test_should_be_possible_if_cards_contain_two_cards_with_same_rank
    @card_set_a << Card.new({:rank => Card.rank[:two], :suit => nil})
    assert(OnePair.possible_with_cards(@card_set_a))
  end

  def test_should_be_possible_if_cards_contain_more_than_two_cards_with_same_rank
    @card_set_a << Card.new({:rank => Card.rank[:two], :suit => nil})
    @card_set_a << Card.new({:rank => Card.rank[:two], :suit => nil})
    assert(OnePair.possible_with_cards(@card_set_a))
  end

  def test_should_select_only_five_cards
    @card_set_a << Card.new({:rank => Card.rank[:two], :suit => nil})
    c = OnePair.new(@card_set_a)
    assert_equal(5, c.cards.size)
  end

  def test_cards
    @card_set_a << Card.new({:rank => Card.rank[:two], :suit => nil})
    c = OnePair.new(@card_set_a)
    assert_equal(Card.rank[:two], c.cards[0].rank)
    assert_equal(Card.rank[:two], c.cards[1].rank)
    assert_equal(Card.rank[:eight], c.cards[2].rank)
    assert_equal(Card.rank[:seven], c.cards[3].rank)
    assert_equal(Card.rank[:six], c.cards[4].rank)
  end

  def test_should_select_the_highest_pair
    @card_set_a << Card.new({:rank => Card.rank[:two], :suit => nil})
    @card_set_a << Card.new({:rank => Card.rank[:six], :suit => nil})
    c = OnePair.new(@card_set_a)
    assert_equal(Card.rank[:six], c.cards[0].rank)
    assert_equal(Card.rank[:six], c.cards[1].rank)
    assert_equal(Card.rank[:eight], c.cards[2].rank)
    assert_equal(Card.rank[:seven], c.cards[3].rank)
    assert_equal(Card.rank[:five], c.cards[4].rank)
  end
end