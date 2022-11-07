class AddNameUniqueness < ActiveRecord::Migration[7.0]
  def change
    add_index :products, :name, unique:true
  end
end
