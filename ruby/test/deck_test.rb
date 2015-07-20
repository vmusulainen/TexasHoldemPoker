require 'test/unit'
require 'deck'

class DeckTest <  Test::Unit::TestCase

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


  def test_initialize
    deck = Deck.new
    assert_equal(52, deck.playing_cards.size)
  end

  def test_get_playing_card_should_remove_gotten_card_from_deck
    deck = Deck.new
    card = deck.get_playing_card
    assert_nil(deck.playing_cards.index(card))
  end
end
