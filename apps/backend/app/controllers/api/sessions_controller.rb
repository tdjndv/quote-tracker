class Api::SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id

      render json: {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email
        }
      }, status: :ok
    else
      render json: {
        error: "Invalid email or password"
      }, status: :unauthorized
    end
  end

  def destroy
    session.delete(:user_id)

    render json: { message: "Logged out" }
  end
end