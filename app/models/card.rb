class Card < ApplicationRecord
    has_many :libraries
    has_many :users, through: :libraries
end
