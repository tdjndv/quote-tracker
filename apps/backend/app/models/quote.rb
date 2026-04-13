class Quote < ApplicationRecord
  belongs_to :user

  has_many :quote_tags, dependent: :destroy
  has_many :tags, through: :quote_tags

  validates :content, presence: true
end