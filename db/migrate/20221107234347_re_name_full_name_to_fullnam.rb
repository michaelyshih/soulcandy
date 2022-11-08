class ReNameFullNameToFullnam < ActiveRecord::Migration[7.0]
  def change
    rename_column :cart_items, :full_name, :fullname
  end
end
