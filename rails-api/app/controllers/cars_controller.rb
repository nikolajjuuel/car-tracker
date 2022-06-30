class CarsController < ApplicationController
  before_action :set_car, only: %i[ show update destroy ]

  def index
    @cars = Car.all
    render json: @cars
  end

  def show
   # render json: @cars.to_json(include: :person)
    #@people = Car.find(params[:id])
    render json: @car.to_json(include: :person)

  end

  # POST people/[id]/car
  def create
    @car = Car.new(car_params)
  
      if @car.save
        render json:@car, status: :created, location:@car
      else
        render json:@car.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT people/[id]/car/[id]

    def update
      if@car.update(car_params)
        render json:@car
      else
        render json:@car.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE people/[id]/car/[id]
    def destroy
    @car.destroy
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_car
      @car = Car.find(params[:id])
      end
  
      # Only allow a list of trusted parameters through.
      def car_params
        params.permit(:year, :make, :model, :price, :person_id)
      end

end
