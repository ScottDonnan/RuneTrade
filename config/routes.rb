Rails.application.routes.draw do
  resources :trade_comments
  resources :trades
  resources :libraries
  resources :users
  resources :cards
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
