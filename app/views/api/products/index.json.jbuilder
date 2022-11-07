 @products.each do |product|
    json.set! product.name do
        json.extract! product, :id, :fullname, :name, :price, :color
    end
end
