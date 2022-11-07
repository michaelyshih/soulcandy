class ChangeAmountOfCartItems < ActiveRecord::Migration[7.0]
  def change
    change_column_null :cart_items, :amount, false
  end
end
