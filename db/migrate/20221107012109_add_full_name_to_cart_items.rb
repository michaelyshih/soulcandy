class AddFullNameToCartItems < ActiveRecord::Migration[7.0]
  def change
    add_column :cart_items, :full_name, :string
  end
end
