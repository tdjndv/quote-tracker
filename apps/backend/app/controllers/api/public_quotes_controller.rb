class Api::PublicQuotesController < ApplicationController
  def index
    quotes = Quote.where(is_public: true).includes(:tags, :user).order(created_at: :desc)

    render json: quotes.as_json(
      include: {
        tags: { only: [:id, :name] },
        user: { only: [:id, :email] }
      }
    ), status: :ok
  end
end