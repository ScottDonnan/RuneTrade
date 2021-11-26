class UsersController < ApplicationController

    def me 
        
    end

    def user_single_library
        user = User.find_by(id: params[:id])
        if user.valid?
            library = user.user_card_lib(params[:card])
            if library.valid?
                render json: library
            else
                render json: {errors: library.errors.full_messages}, status: :not_found
            end
        else 
            render json: {errors: user.errors.full_massages}, status: :not_found
        end
    end

    def cards
        user = User.find_by(id: params[:id])
        if user.valid?
            render json: user.cards
        else
            render json: {errors: user.errors.full_messages}, status: :not_found
        end
    end
    
    def signup
        user = User.create(user_params)
        if user.valid?
            render json: user
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit :user_name, :password_digest, :email
    end
end
