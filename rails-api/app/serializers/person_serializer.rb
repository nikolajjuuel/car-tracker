class PersonSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :email
  has_many :cars
end
