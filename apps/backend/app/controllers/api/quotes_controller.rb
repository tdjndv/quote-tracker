class Api::QuotesController < ApplicationController
  before_action :authorize_user
  before_action :set_quote, only: [:show, :update, :destroy]

  def index
    quotes = current_user.quotes.includes(:tags)
    render json: quotes.as_json(include: :tags), status: :ok
  end

  def show
    render json: @quote.as_json(include: :tags), status: :ok
  end

  def create
    quote = current_user.quotes.new(quote_params.except(:tag_names))

    if quote.save
        attach_tags(quote, quote_params[:tag_names])
      render json: quote.as_json(include: :tags), status: :created
    else
      render json: { errors: quote.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @quote.update(quote_params.except(:tag_names))
        attach_tags(@quote, quote_params[:tag_names]) if quote_params[:tag_names]
      render json: @quote.as_json(include: :tags), status: :ok
    else
      render json: { errors: @quote.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @quote.destroy
    render json: { message: "Quote deleted successfully" }, status: :ok
  end

  private

  def set_quote
    @quote = current_user.quotes.includes(:tags).find_by(id: params[:id])

    unless @quote
      render json: { error: "Quote not found" }, status: :not_found
    end
  end

  def quote_params
    params.require(:quote).permit(:content, :author, :book_title, :notes, :is_public, tag_names: [])
  end

  def attach_tags(quote, tag_names)
    return unless tag_names

    tags = tag_names.map do |name|
        Tag.find_or_create_by(name: name.strip.downcase)
    end

    quote.tags = tags
end


end