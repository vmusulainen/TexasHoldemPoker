require 'test/unit'
require 'straight'

class StraightTest < Test::Unit::TestCase

  def test_creation_throw_error_for_unappropriated_cards
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards << Card.new({:rank => Card.rank[:ten], :suit => nil})
    cards << Card.new({:rank => Card.rank[:queen], :suit => nil})
    cards << Card.new({:rank => Card.rank[:ace], :suit => nil})
    cards.shuffle!
    assert_raises { Straight.new(cards) }
  end

  def test_strength
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:seven], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards.shuffle!
    combination = Straight.new(cards)
    assert_equal(5, combination.strength)
  end

  def test_should_not_be_possible_if_cards_contain_3_or_4_in_row_cards
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards << Card.new({:rank => Card.rank[:nine], :suit => nil})
    cards << Card.new({:rank => Card.rank[:ten], :suit => nil})
    cards << Card.new({:rank => Card.rank[:jack], :suit => nil})
    cards.shuffle!
    assert !(Straight.possible_with_cards(cards))
  end

  def test_should_not_be_possible_if_cards_do_not_contain_lowest_sequence
    cards = []
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:queen], :suit => nil})
    cards << Card.new({:rank => Card.rank[:king], :suit => nil})
    cards << Card.new({:rank => Card.rank[:ace], :suit => nil})
    cards.shuffle!
    assert !(Straight.possible_with_cards(cards))
  end

  def test_should_be_possible_if_cards_contain_5_in_row
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:seven], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards.shuffle!
    assert(Straight.possible_with_cards(cards))
  end

  def test_should_not_be_possible_if_cards_contain_sequence_beginning_from_ace
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:queen], :suit => nil})
    cards << Card.new({:rank => Card.rank[:king], :suit => nil})
    cards << Card.new({:rank => Card.rank[:ace], :suit => nil})
    cards.shuffle!

    assert(Straight.possible_with_cards(cards))
  end

  def test_should_select_only_five_cards
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:seven], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards.shuffle!

    c = Straight.new(cards)
    assert_equal(5, c.cards.size)
  end

  def test_cards
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards << Card.new({:rank => Card.rank[:nine], :suit => nil})
    cards.shuffle!

    c = Straight.new(cards)
    assert_equal(Card.rank[:six], c.cards[0].rank)
    assert_equal(Card.rank[:five], c.cards[1].rank)
    assert_equal(Card.rank[:four], c.cards[2].rank)
    assert_equal(Card.rank[:three], c.cards[3].rank)
    assert_equal(Card.rank[:two], c.cards[4].rank)
  end

  def test_should_select_the_highest_sequence
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    cards << Card.new({:rank => Card.rank[:seven], :suit => nil})
    cards << Card.new({:rank => Card.rank[:eight], :suit => nil})
    cards.shuffle!

    c = Straight.new(cards)
    assert_equal(Card.rank[:eight], c.cards[0].rank)
    assert_equal(Card.rank[:seven], c.cards[1].rank)
    assert_equal(Card.rank[:six], c.cards[2].rank)
    assert_equal(Card.rank[:five], c.cards[3].rank)
    assert_equal(Card.rank[:four], c.cards[4].rank)
  end

  def test_should_select_sequence_beginning_from_ace
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:queen], :suit => nil})
    cards << Card.new({:rank => Card.rank[:king], :suit => nil})
    cards << Card.new({:rank => Card.rank[:ace], :suit => nil})
    cards.shuffle!

    c = Straight.new(cards)
    assert_equal(Card.rank[:five], c.cards[0].rank)
    assert_equal(Card.rank[:four], c.cards[1].rank)
    assert_equal(Card.rank[:three], c.cards[2].rank)
    assert_equal(Card.rank[:two], c.cards[3].rank)
    assert_equal(Card.rank[:ace], c.cards[4].rank)
  end

  def test_special_case
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:jack], :suit => nil})
    cards << Card.new({:rank => Card.rank[:ace], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards.shuffle!

    c = Straight.new(cards)
    assert_equal(Card.rank[:five], c.cards[0].rank)
    assert_equal(Card.rank[:four], c.cards[1].rank)
    assert_equal(Card.rank[:three], c.cards[2].rank)
    assert_equal(Card.rank[:two], c.cards[3].rank)
    assert_equal(Card.rank[:ace], c.cards[4].rank)
  end


  def test_sequence_should_answer_false_for_empty_array
    assert !(Straight.sequence?([]) { |each| each })
  end

  def test_sequence_should_answer_false_for_1_3
    assert !(Straight.sequence?([1, 3]) { |each| each })
  end

  def test_sequence_should_answer_false_for_1_2_0
    assert !(Straight.sequence?([1, 2, 0]) { |each| each })
  end

  def test_sequence_should_answer_false_for_array_with_one_element
    assert (Straight.sequence?([1]) { |each| each })
  end

  def test_sequence_should_answer_true_for_array_with_1_2
    assert (Straight.sequence?([1, 2]) { |each| each })
  end

  def test_sequence_should_answer_true_for_array_with_1_2_3_4_5
    assert (Straight.sequence?([1, 2, 3, 4, 5]) { |each| each })
  end

  def test_sequence_should_answer_true_for_array_with_5_4_3_2_1
    assert (Straight.sequence?([5, 4, 3, 2, 1]) { |each| each })
  end

  def test_sequence_callback
    cards = []
    cards << Card.new({:rank => Card.rank[:two], :suit => nil})
    cards << Card.new({:rank => Card.rank[:three], :suit => nil})
    cards << Card.new({:rank => Card.rank[:four], :suit => nil})
    cards << Card.new({:rank => Card.rank[:five], :suit => nil})
    cards << Card.new({:rank => Card.rank[:six], :suit => nil})
    assert (Straight.sequence?(cards) { |each| each.weight })
  end

end