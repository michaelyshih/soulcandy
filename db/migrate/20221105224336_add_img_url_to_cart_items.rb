class AddImgUrlToCartItems < ActiveRecord::Migration[7.0]
  def change
    add_column :cart_items, :img_url, :string
  end
end
