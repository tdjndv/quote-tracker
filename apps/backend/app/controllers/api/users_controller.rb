class Api::UsersController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      session[:user_id] = user.id

      render json: {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email
        }
      }, status: :created
    else
      render json: {
        errors: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def show_me
    if current_user
      render json: {
        user: {
          id: current_user.id,
          email: current_user.email
        }
      }, status: :ok
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end