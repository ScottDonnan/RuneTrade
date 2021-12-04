class UsersController < ApplicationController

    def show 
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: {errors: "no active session"}, status: :unauthorized
        end
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
    
    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        user = User.find(params[:id])
        if user.update(user_update_params)
            render json: user
        else
            render json: {errors: user.errors.full_messages}, status: :not_found
        end
    end

    private

    def user_params
        params.permit :user_name, :password, :email, :password_confirmation, :loot_token
    end

    def user_update_params
        params.permit :loot_token
    end
end
