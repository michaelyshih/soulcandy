Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # post '/api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    get '/products/:productName', to: "products#show", as: :product
    get '/search', to: "products#search", as: :products_by_search
    resources :products, only: [:index]
    resource :session, only: [:show, :create, :destroy]
    resources :cart_items, except: [:edit, :new, :show]
    resources :reviews, except: [:edit, :new, :show]

  end

  get '*path', to: "static_pages#frontend_index"

end
