class TradesController < ApplicationController
    
    def index
        render json: Trade.all, include: ['proposer_library', 'proposer_library.card', 'trade_proposer', 'trade_accepter', 'accepter_library', 'accepter_library.card', 'trade_comments.user']
    end

    def show
        trade = Trade.find_by(id: params[:id])
        if trade.valid?
            render json: trade
        else
            render json: {errors: "trade does not exist"}, status: :not_found
        end
    end

    def update
        trade = Trade.find(params[:id])
        if trade.update(trade_update_params)
            render json: trade
        else
            render json: {errors: trade.errors.full_messages}, status: :not_found
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

    def destroy
        trade = Trade.find_by(id: params[:id])
        if trade.valid?
            trade.destroy
            head :no_content
        else
            render json: { errors: trade.errors.full_messages }, status: :not_found
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
