class Api::ProductsController < ApplicationController

  def index #api/products
    case
    when params[:category] === "undefined" && params[:subcategory] === "undefined"
      @products = Product.all
    else
      case params[:category]
      when "gaming"
        case
        when params[:subcategory] === 'accessory'
          @products ||= Product.where("gaming AND accessory")
        when params[:subcategory] === 'headset'
          @products ||= Product.where("gaming AND headset")
        else
          @products ||= Product.where("gaming")
        end

      when "headset","earbuds"
        case params[:category]
        when "headset"
          case params[:subcategory]
          when "wired"
            @products ||= Product.where("wired AND headset")
          when "wireless"
            @products ||= Product.where("wired = false AND headset")
          else
            @products ||= Product.where("headset = true")
          end
        when "earbuds"
          case params[:subcategory]
          when "wired"
            @products ||= Product.where("wired AND headset = false")
          when "wireless"
            @products ||= Product.where("wired = false AND headset = false AND accessory = false")
          else
            @products ||= Product.where("headset = false and accessory = false")
          end
        end

      when "accessory"
          @products ||= Product.where("accessory")
        end
    end
  end

  def show
      @product = Product.find_by(name: params[:product_name])
  end
end
