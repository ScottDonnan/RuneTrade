class UserMailer < ApplicationMailer
    default from: 'runetradeapp@gmail.com'

    def welcome_email
        @user = params[:user]
        @url = 'http://runetrade.herokuapp.com/login'
        mail(to: @user.email, subject: 'Welcome to TradeRune')
    end

    def trade_confirmation_email
        @user = params[:user]
        @trade = params[:trade]
        @trade_url = 'http://runetrade.herokuapp.com/trade'
        @proposer_card = params[:proposer_card]
        @accepter_card = params[:accepter_card]
        mail(to: @user.email, subject: "Trade Complete")
    end
end
