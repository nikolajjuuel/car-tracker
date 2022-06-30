Rails.application.routes.draw do
  resources :tests
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # resources :cars, :person
  resources :people, :cars do
  end
  resources :cars

  delete '/people/:id' => 'people#destroy'

  

end
