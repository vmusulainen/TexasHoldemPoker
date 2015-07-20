class Card < ActiveRecord::Base
  belongs_to :games

  def self.suit
    {:hearth => ['2661'.hex].pack('U'), :clubs => ['2667'.hex].pack('U'), :diamonds => ['2662'.hex].pack('U'), :spades => ['2664'.hex].pack('U')}
  end

  def self.rank
    return {
        :two => '2',
        :three => '3',
        :four => '4',
        :five => '5',
        :six => '6',
        :seven => '7',
        :eight => '8',
        :nine => '9',
        :ten => '10',
        :jack => 'J',
        :queen => 'Q',
        :king => 'K',
        :ace => 'A'
    }
  end

  def be_common
    self.set = 'common'
  end

  def common?
    self.set == 'common'
  end

  def name
    "#{self.rank} #{self.suit}"
  end

  def weight
    idx = self.class.rank.values.index(self.rank)
    raise "Unknown rank: '#{self.rank}'" if idx.nil?
    idx + 2
  end

  def <=>(aCard)
    self.weight <=> aCard.weight
  end

end
