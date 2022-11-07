@cart_items.each do |item|
    json.set! item.name do
        json.extract! item, :id, :amount, :name, :price, :color, :img_url, :product_id
    end
end
