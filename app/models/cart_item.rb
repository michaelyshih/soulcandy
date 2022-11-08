# == Schema Information
#
# Table name: cart_items
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  product_id :bigint           not null
#  amount     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string           not null
#  price      :float            not null
#  color      :string           not null
#  img_url    :string
#  fullname   :string
#
class CartItem < ApplicationRecord

  validates_presence_of :user_id, :product_id, :amount, :name, :price, :color

  belongs_to :user
  belongs_to :product
end
