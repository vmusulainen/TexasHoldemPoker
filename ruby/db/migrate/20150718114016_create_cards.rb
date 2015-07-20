class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.references :game, index: true, foreign_key: true
      t.string :set
      t.string :rank
      t.string :suit
      t.timestamps null: false
    end
  end
end
