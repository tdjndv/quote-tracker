class CreateQuotes < ActiveRecord::Migration[8.0]
  def change
    create_table :quotes do |t|
      t.references :user, null: false, foreign_key: true
      t.text :content, null: false
      t.string :author
      t.string :book_title
      t.text :notes
      t.boolean :is_public, null: false, default: false

      t.timestamps
    end
  end
end