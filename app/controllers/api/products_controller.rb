class Api::ProductsController < ApplicationController

  def index #api/products
    query = Hash.new(false)

    if params[:category] === "earbuds"
      query['headset'] = false
    elsif params[:category] != 'undefined'
      query[params[:category]] = true
    end

    if params[:subcategory] === "wireless"
      query['wired'] = false
    elsif params[:subcategory] != 'undefined'
      query[params[:subcategory]] = true
    end
    debugger
    @products ||= Product.where(query)

  end

  def show
      @product = Product.find_by(name: params[:product_name])
  end

  def search
    @products ||= Product.where("fullname ILIKE ?", "%#{params[:query]}%")
    if (@products.empty?)
      @products ||= Product.all
    end
    render "/api/products/index"
  end


end
