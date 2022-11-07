class AddFullNameToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :fullname, :string, null: false 
  end
end
