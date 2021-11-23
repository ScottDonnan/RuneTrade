class CreateTrades < ActiveRecord::Migration[6.1]
  def change
    create_table :trades do |t|
      t.integer :trade_proposer
      t.integer :trade_accepter
      t.integer :proposer_library
      t.integer :accepter_library
      t.boolean :pending
      t.boolean :executed

      t.timestamps
    end
  end
end
