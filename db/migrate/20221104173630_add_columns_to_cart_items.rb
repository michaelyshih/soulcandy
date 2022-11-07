class AddColumnsToCartItems < ActiveRecord::Migration[7.0]
  def change
    add_column :cart_items, :name, :string, null:false
    add_column :cart_items, :price, :float, null:false
    add_column :cart_items, :color, :string, null:false
  end
end
