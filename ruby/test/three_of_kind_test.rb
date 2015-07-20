require 'test/unit'
require 'three_of_kind'

class ThreeOfKindTest < Test::Unit::TestCase

  def test_creation_throw_error_for_unappropriated_cards
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:seven], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards.shuffle!
    assert_raises { ThreeOfKind.new(cards) }
  end

  def test_strength
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:seven], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards.shuffle!
    combination = ThreeOfKind.new(cards)
    assert_equal(4, combination.strength)
  end

  def test_should_not_be_possible_if_cards_do_not_contain_three_cards_with_same_rank
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:seven], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards.shuffle!
    assert !(ThreeOfKind.possible_with_cards(cards))
  end

  def test_should_be_possible_if_cards_contain_three_cards_with_same_rank
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:seven], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards.shuffle!
    assert(ThreeOfKind.possible_with_cards(cards))
  end

  def test_should_be_possible_if_cards_contain_more_than_three_cards_with_same_rank
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:seven], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards.shuffle!

    assert(ThreeOfKind.possible_with_cards(cards))
  end

  def test_should_select_only_five_cards
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:seven], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards.shuffle!

    c = ThreeOfKind.new(cards)
    assert_equal(5, c.cards.size)
  end

  def test_cards
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:seven], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards.shuffle!

    c = ThreeOfKind.new(cards)
    assert_equal(Card.rank[:two], c.cards[0].rank)
    assert_equal(Card.rank[:two], c.cards[1].rank)
    assert_equal(Card.rank[:two], c.cards[2].rank)
    assert_equal(Card.rank[:eight], c.cards[3].rank)
    assert_equal(Card.rank[:seven], c.cards[4].rank)
  end

  def test_should_select_the_highest_three_cards
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards.shuffle!

    c = ThreeOfKind.new(cards)
    assert_equal(Card.rank[:six], c.cards[0].rank)
    assert_equal(Card.rank[:six], c.cards[1].rank)
    assert_equal(Card.rank[:six], c.cards[2].rank)
    assert_equal(Card.rank[:eight], c.cards[3].rank)
    assert_equal(Card.rank[:two], c.cards[4].rank)
  end
end