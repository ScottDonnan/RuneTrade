class LibrariesController < ApplicationController

    def user_library
        user = User.find_by(id: params[:id])
        if user.valid?
            render json: user.libraries
        else
            render json: {errors: user.errors.full_messages}, status: :not_found
        end
    end
    
    def show
        library = Library.find_by(id: params[:id])
        if library.valid?
            render json: library
        else
            render json: {errors: library.errors.full_messages}, status: :not_found
        end
    end

    def create
        library = Library.create(library_params)
        if library.valid?
            render json: library
        else
            render json: {errors: library.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        library = Library.find(params[:id])
        if library.update(library_update_params)
            render json: library, status: :ok
        else
            render json: {errors: library.errors.full_messages}, status: :unprocessable_entity
        end
    end


    private

    def library_params
        params.permit :user_id, :card_id
    end

    def library_update_params
        params.permit :user_id
    end

end
