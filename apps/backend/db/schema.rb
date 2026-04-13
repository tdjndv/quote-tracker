# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_04_13_163312) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "quote_tags", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "quote_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "updated_at", null: false
    t.index ["quote_id", "tag_id"], name: "index_quote_tags_on_quote_id_and_tag_id", unique: true
    t.index ["quote_id"], name: "index_quote_tags_on_quote_id"
    t.index ["tag_id"], name: "index_quote_tags_on_tag_id"
  end

  create_table "quotes", force: :cascade do |t|
    t.string "author"
    t.string "book_title"
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.boolean "is_public", default: false, null: false
    t.text "notes"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_quotes_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "quote_tags", "quotes"
  add_foreign_key "quote_tags", "tags"
  add_foreign_key "quotes", "users"
end
