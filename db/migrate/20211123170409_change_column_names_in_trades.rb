class ChangeColumnNamesInTrades < ActiveRecord::Migration[6.1]
  def change
    rename_column :trades, :trade_proposer, :trade_proposer_id
    rename_column :trades, :trade_accepter, :trade_accepter_id
    rename_column :trades, :proposer_library, :proposer_library_id
    rename_column :trades, :accepter_library, :accepter_library_id
  end
end
