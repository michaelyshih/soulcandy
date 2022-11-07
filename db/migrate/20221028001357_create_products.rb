class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.float :price, null: false
      t.string :color, null: false
      t.text :details, null: false
      t.boolean :wired, null: false
      t.boolean :gaming, null: false
      t.boolean :headset, null: false
      t.boolean :accessory, null: false

      t.timestamps
    end
    add_index :products, [:name, :color], unique: true
  end
end
