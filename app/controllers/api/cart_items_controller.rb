class Api::CartItemsController < ApplicationController
    before_action :set_cart, only: %i[ show update destroy ]
    before_action :require_logged_in, only: [:create, :edit, :update]
    def create
        @cart_item = CartItem.new(cart_params)
        @cart_item.user_id = current_user.id
        if @cart_item.save
            render "api/cart_items/show"
        else
            debugger
            # @messages = @cart_item.errors.full_messages
            # render "api/errors/internal_server_error"
        end
    end

    def show
    end

    def index
        @cart_items = CartItem.where(user_id: params[:user_id])

    end

    def update
        if (current_user.id == @cart_item.user_id) && (@cart_item && @cart_item.update(cart_params))
            render "api/cart_items/show"
        else
            @messages = ["Something went wrong!"]
            render "api/errors"
        end
    end

    def destroy
        @cart_item.destroy
    end

    private

    def set_cart
        @cart_item = CartItem.find_by(id: params[:id])
    end

    def cart_params
        params.require(:cart_item).permit(:user_id, :product_id, :amount, :name, :price, :color, :img_url)
    end

end
