class TradeSerializer < ActiveModel::Serializer
  attributes :id, :trade_proposer, :trade_accepter, :proposer_library, :accepter_library, :pending, :executed
end
