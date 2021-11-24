class UsersController < ApplicationController

    def me 
        
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
