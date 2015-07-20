require 'deck'
require 'card_combination'
require 'high_card'
require 'one_pair'
require 'two_pair'
require 'three_of_kind'
require 'straight'
require 'flash'

class Game < ActiveRecord::Base

  has_many :cards
  after_initialize :create_on


  def self.player_count
    return 2;
  end

  def self.common_card_count
    return 5;
  end

  def self.personal_card_count
    return 2;
  end

  def addCard(aCard)
    self.cards << aCard
  end

  def create_on
    @players = []
    if self.new_record?
      self.deal_cards
    end
  end

  def deal_cards
    deck = Deck.new
    deck.shuffle

    # It's possible take 5 random cards as shown below, but it smells on my taste
    # cards = deck.cards.sample(self.class.common_card_count)
    # cards.each (|each| each.be_common)

    self.class.common_card_count.times {
      card = deck.get_playing_card
      card.be_common
      self.cards << card }

    self.class.player_count.times { |each|
      self.class.personal_card_count.times {
        card = deck.get_playing_card
        card.set = "Player #{each + 1}"
        self.cards << card
      } }
  end

  def player_cards(player)
    self.cards.select { |each| each.set == player }
  end


  def player_card_combinations(player)
    cards = self.player_cards(player) + self.common_cards
    [HighCard, OnePair, TwoPair, ThreeOfKind, Straight, Flash].select { |aClass| aClass.possible_with_cards(cards) }.collect { |aClass| aClass.new(cards) }
  end

  def player_highest_card_combination(player)
    self.player_card_combinations(player).sort!.last
  end

  def winner
    temp = self.players.collect { |player| {:player => player, :combination => self.player_highest_card_combination(player)} }
    temp.sort! { |a, b| a[:combination] <=> b[:combination] }
    puts "temp: #{temp}"
    puts "last cards: #{(temp.last[:combination]).cards}"
    puts "last cards: #{temp[temp.size - 2][:combination].cards}"
    if (temp.last[:combination] <=> temp[temp.size - 2][:combination]) == 0
      return nil
    end
    temp.last[:player]
  end

  def player_winner?(player)
    self.winner == player
  end


  def common_cards
    self.cards.select { |each| each.common? }
  end

  def players
    players = self.cards.reject { |each| each.common? }.collect { |each| each.set }.to_set
    players.sort
  end

end
