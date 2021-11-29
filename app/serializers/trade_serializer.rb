class TradeSerializer < ActiveModel::Serializer
  attributes :id, :trade_proposer_id, :trade_accepter_id, :proposer_library_id, :accepter_library_id, :pending, :executed

  belongs_to :trade_proposer
  belongs_to :trade_accepter

  belongs_to :proposer_library
  belongs_to :accepter_library

  has_many :trade_comments
  # has_many :users, through: :trade_comments
end
