class CardSerializer < ActiveModel::Serializer
  attributes :id, :name, :set, :card_image, :full_image, :region, :rarity, :type, :supertype
end
