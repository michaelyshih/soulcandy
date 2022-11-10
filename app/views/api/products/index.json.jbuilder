 @products.each do |product|
    json.set! product.name do
        json.extract! product, :id, :fullname, :name, :price, :color, :numReviews, :avgReviews
        product_hash = {}
        product.photos.map {|photo| product_hash[photo.filename.to_s.downcase] = photo.url}
        json.photos product_hash
    end
end
