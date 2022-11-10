class Api::ReviewsController < ApplicationController
    before_action :set_review, only: %i[ show update destroy ]
    before_action :require_logged_in, only: [:create, :edit, :update]

    def create
        @review = Review.new(review_params)
        @review.user_id = current_user.id
        if @review.save
            render "api/reviews/show"
        else
            # @messages = @review.errors.full_messages
            # render "api/errors/internal_server_error"
        end
    end

    def show
    end

    def index
        @reviews = Review.where(product_id: params[:product_id])
    end

    def update
        if (current_user.id == @review.user_id) && (@review && @review.update(review_params))
            render "api/reviews/show"
        else
            @messages = ["Something went wrong!"]
            render "api/errors"
        end
    end

    def destroy
        @review.destroy
    end

    private

    def set_review
        @review = Review.find_by(id: params[:id])
    end

    def review_params
        params.require(:review).permit(:user_id, :product_id, :name, :body, :rating)
    end

end
