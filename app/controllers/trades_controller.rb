class TradesController < ApplicationController
    
    def index
        render json: Trade.all
    end

    def update
        trade = Trade.find(params[:id])
        if trade.update(trade_update_params)
            render json: trade
        else
            render json: {errors: "trade does not exist"}, status: :not_found
        end
    end

    def create
        trade = Trade.create(trade_params)
        if trade.valid?
            render json: trade
        else 
            render json: { errors: trade.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def trade_update_params
        params.permit :trade_accepter_id, :accepter_library_id, :pending, :executed
    end

    def trade_params
        params.permit :trade_proposer_id, :trade_accepter_id, :proposer_library_id, :accepter_library_id, :pending, :executed
    end
end
