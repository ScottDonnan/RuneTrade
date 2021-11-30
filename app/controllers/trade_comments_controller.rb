class TradeCommentsController < ApplicationController

    def create
        comment = TradeComment.create(comment_params)
        if comment.valid?
            render json: comment
        else
            render json: {errors: comment.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        comment = TradeComment.find_by(id: params[:id])
        if comment.valid?
            comment.destroy
            head :no_content
        else
            render json: {errors: "Restaurant not found"}, status: :not_found
        end
    end

    private

    def comment_params
        params.permit :comment, :trade_id, :user_id
    end
end
