class RemoveIndex < ActiveRecord::Migration[7.0]
  def change
    remove_index "products", column: ["name", "color"], name: "index_products_on_name_and_color"
  end
end
