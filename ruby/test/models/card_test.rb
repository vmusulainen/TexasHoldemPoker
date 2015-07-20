require 'test/unit'
#require 'playing_card'

class CardTest < ActiveSupport::TestCase

  # Called before every test method runs. Can be used
  # to set up fixture information.
  def setup
    # Do nothing
  end

  # Called after every test method runs. Can be used to tear
  # down fixture information.

  def teardown
    # Do nothing
  end

  def test_weight_for_two
    card = Card.new({rank => Card.rank[:two], suit => Card.suit[:diamonds]})
    assert_equal(2, card.weight)
  end

  def test_weight_for_ace
    puts "test_weight_for_ace #{Card.rank[:two]}"
    card = Card.new({rank => Card.rank[:ace], suit => Card.suit[:diamonds]})
    assert_equal(14, card.weight)
  end

  def test_name
    card = Card.new({rank => Card.rank[:two], suit => Card.suit[:diamonds]})
    assert_equal('2 ♢', card.name)
  end

  def test_comparing
    fail('Not implemented')
  end
end