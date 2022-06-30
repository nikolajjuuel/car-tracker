#Car Table - year, make, model, price (i.e. 2020, Toyota, Highlander, $40,000) (integer, string, string, integer)

class CreateCars < ActiveRecord::Migration[7.0]
  def change
    create_table :cars do |t|
      t.integer :year
      t.string :make
      t.string :model
      t.integer :price
      t.references :person, foreign_key: true, index: true

      t.timestamps
    end
  end
end
