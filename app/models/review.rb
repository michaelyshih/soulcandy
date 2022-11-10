# == Schema Information
#
# Table name: reviews
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  body       :text             not null
#  rating     :bigint           not null
#  product_id :bigint           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Review < ApplicationRecord
  validates_presence_of :name, :body, :rating
  validates :rating, numericality: {only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 10}

  belongs_to :product
  belongs_to :user
end
