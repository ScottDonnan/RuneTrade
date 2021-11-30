class Library < ApplicationRecord
    belongs_to :user
    belongs_to :card

    has_many :proposing_libraries, foreign_key: :proposer_library, class_name: 'Library'
    has_many :accepter_libraries, through: :proposing_libraries

    has_many :accepting_libraries, foreign_key: :accepter_library, class_name: 'Library'
    has_many :proposer_libraries, through: :accepting_libraries
    
end
