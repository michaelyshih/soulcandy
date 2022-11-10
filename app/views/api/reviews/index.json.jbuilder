@reviews.each do |review|
    json.set! review.id do
        json.extract! review, :id, :name, :rating, :user_id, :product_id, :body, :created_at
    end
end
