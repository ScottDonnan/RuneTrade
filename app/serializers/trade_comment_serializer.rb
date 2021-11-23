class TradeCommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :trade_id, :user_id
end
