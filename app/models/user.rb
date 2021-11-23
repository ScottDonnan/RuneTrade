class User < ApplicationRecord

    has_many :libraries
    has_many :cards, through: :libraries

    has_many :trades

    has_many :trade_comments

    has_many :proposed_trades, foreign_key: :trade_proposer, class_name: 'Trade'
    has_many :trade_accepters, through: :proposed_trades

    has_many :accepted_trades, foreign_key: :trade_accepter, class_name: 'Trade'
    has_many :trade_proposers, through: :accepted_trades

end
