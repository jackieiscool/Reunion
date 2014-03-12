class CreateSuggestions < ActiveRecord::Migration
  def change
    create_table :suggestions do |t|
      t.integer :category_id
      t.text :description
      t.string :name
      t.integer :votes
      t.timestamps
    end
  end
end
