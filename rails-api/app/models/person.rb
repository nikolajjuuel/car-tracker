class Person < ApplicationRecord
  has_many :cars, dependent: :destroy
end
