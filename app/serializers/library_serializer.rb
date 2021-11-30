class LibrarySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :card_id, :listed

  belongs_to :card
end
