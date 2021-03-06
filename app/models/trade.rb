class Trade < ApplicationRecord
    belongs_to :trade_proposer, class_name: 'User'
    belongs_to :trade_accepter, class_name: 'User', optional: true

    belongs_to :proposer_library, class_name: 'Library'
    belongs_to :accepter_library, class_name: 'Library', optional: true

    has_many :trade_comments, dependent: :destroy
    has_many :users, through: :trade_comments

    validates :trade_proposer_id, :proposer_library_id, presence: true
    validates :accepter_library_id, :proposer_library_id, uniqueness: {scope: :pending}, if: :pending_true, allow_nil: true

    def pending_true
        # byebug
        pending == true
    end
    
end
