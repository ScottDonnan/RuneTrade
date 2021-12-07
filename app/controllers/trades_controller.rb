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

    def email
        user1 = User.find_by(id: params[:trade_proposer_id])
        user2 = User.find_by(id: params[:trade_accepter_id])
        trade = Trade.find_by(id: params[:id])
        proposer_card = trade.proposer_library.card
        accepter_card = trade.accepter_library.card
        if user1.valid? && user2.valid? && trade.valid?
            UserMailer.with(user: user1, trade: trade, proposer_card: proposer_card, accepter_card: accepter_card).trade_confirmation_email.deliver_later
            UserMailer.with(user: user2, trade: trade, proposer_card: proposer_card, accepter_card: accepter_card).trade_confirmation_email.deliver_later
            render json: trade
        else
            render json: {errors: [user1.errors.full_messages, user2.errors.full_messages, trade.errors.full_messages]}, status: :not_found
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
