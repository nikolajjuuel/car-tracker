class CreateTests < ActiveRecord::Migration[7.0]
  def change
    create_table :tests do |t|
      t.string :firstName
      t.string :lastName
      t.string :email
      t.timestamps
    end
  end
end
