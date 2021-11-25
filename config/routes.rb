Rails.application.routes.draw do
  resources :trade_comments
  resources :trades
  resources :libraries
  resources :users
  resources :cards

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/userlibrary/:id", to: "libraries#user_library"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
