# == Schema Information
#
# Table name: products
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  price      :float            not null
#  color      :string           not null
#  details    :text             not null
#  wired      :boolean          not null
#  gaming     :boolean          not null
#  headset    :boolean          not null
#  accessory  :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  fullname   :string           not null
#
class Product < ApplicationRecord
    validates_presence_of :name, :price, :color, :details, :fullname
    validates :headset, :wired, :gaming, inclusion: {in: [true,false]}
    validates :name, uniqueness: true

    has_many :cart_items
    has_many :reviews

    has_many_attached :photos

    def numReviews
        reviews.count
    end

    def avgReviews
        sum = 0
        reviews.each do |review|
            sum += review.rating
        end
        (sum * 1.0 / numReviews).round(1)
    end

end
