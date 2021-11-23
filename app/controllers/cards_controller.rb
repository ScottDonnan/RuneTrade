class CardsController < ApplicationController

    def index
        cards = Card.all 
        render json: cards
    end

    def show
        card = Card.find_by(id: params[:id])
        if card.valid?
            render json: card
        else
            render json: {errors: card.errors.full_messages}, status: :not_found
        end
    end
    
end
