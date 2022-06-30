class PeopleController < ApplicationController
  before_action :set_people, only: %i[ show update destroy ]

  def index
    @people = Person.all
    render json: @people.to_json(include: :cars)
  end

  def show
   # @people = Person.find(params[:id])
   # render json: @person.to_json(include: :car)
    #render json: @car.to_json(indclude: :person)
    render json: @person.to_json(include: :cars)


  end

  # POST /people
  def create
    @person = Person.new(person_params)

    if @person.save
      render json: @person, status: :created, location: @person
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /people/1
  def update
    if@person.update(person_params)
      render json:@person
    else
      render json:@person.errors, status: :unprocessable_entity
    end
  end

  # DELETE /people/1
  def destroy
   @person.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_people
     @person = Person.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def person_params
      params.permit(:firstName, :lastName, :email)
    end
end
