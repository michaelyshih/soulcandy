@cart_items.each do |item|
    json.set! item.id do
        json.extract! item, :id, :amount, :name, :price, :color, :img_url
    end
end
