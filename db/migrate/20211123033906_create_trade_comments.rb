class CreateTradeComments < ActiveRecord::Migration[6.1]
  def change
    create_table :trade_comments do |t|
      t.string :comment
      t.integer :trade_id
      t.integer :user_id

      t.timestamps
    end
  end
end
