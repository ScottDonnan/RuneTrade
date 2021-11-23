class Trade < ApplicationRecord
    belongs_to :trade_proposer, class_name: 'User'
    belongs_to :trade_accepter, class_name: 'User'

    belongs_to :proposer_library, class_name: 'Library'
    belongs_to :accepter_library, class_name: 'Library'

    has_many :trade_comments 
end
