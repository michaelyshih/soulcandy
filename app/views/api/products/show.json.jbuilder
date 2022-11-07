
json.extract! @product, :id, :name, :price, :color, :fullname, :details, :created_at, :updated_at

product_hash = {}
# # json.photos @product.photos.map {|photo| url_for(photo) }
@product.photos.map {|photo| product_hash[photo.filename.to_s.downcase] = photo.url}

json.photos product_hash
# json.img_urls @product.photos.map{|photo| photo.url }

# json.img_url url_for(@product.photo)
# json.img_url @product.photo.url
