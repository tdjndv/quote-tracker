Rails.application.routes.draw do
  get "/api/health", to: "api/health#index"

  post "/api/signup", to: "api/users#create"
  get "/api/me", to: "api/users#show_me"

  post "/api/login", to: "api/sessions#create"
  delete "/api/logout", to: "api/sessions#destroy"

  get "/api/quotes", to: "api/quotes#index"
  get "/api/quotes/:id", to: "api/quotes#show"
  post "/api/quotes", to: "api/quotes#create"
  patch "/api/quotes/:id", to: "api/quotes#update"
  delete "/api/quotes/:id", to: "api/quotes#destroy"

  get "/api/public/quotes", to: "api/public_quotes#index"
end