# Person Table - first name, last name, email (i.e. John, Smith, johnsmith@gmail.com) (string, string, string)

class CreatePeople < ActiveRecord::Migration[7.0]
  def change
    create_table :people do |t|
      t.string :firstName
      t.string :lastName
      t.string :email

      t.timestamps
    end
  end
end
