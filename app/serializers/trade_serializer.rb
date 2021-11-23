class TradeSerializer < ActiveModel::Serializer
  attributes :id, :trade_proposer_id, :trade_accepter_id, :proposer_library_id, :accepter_library_id, :pending, :executed
end
