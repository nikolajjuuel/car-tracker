puts "running the seeds....."

puts "creating the categories"

Person.create(
  firstName: 'Nikolaj',
  lastName: 'Johansen',
  email: 'nikolaj.juuel@gmail.com'
)
Person.create(
  firstName: 'fred',
  lastName: 'Johansen',
  email: 'fred.juuel@gmail.com'
)
Person.create(
  firstName: 'helle',
  lastName: 'Johansen',
  email: 'helle.juuel@gmail.com'
)

persons = Person.all

Car.create(
  year: 1992,
  make: 'Honda',
  model: 'CR-V',
  price: 4000,
  person_id: 1
)

Car.create(
  year: 2020,
  make: 'Honda',
  model: 'Civic',
  price: 2000,
  person_id: 1
)

Car.create(
  year: 1999,
  make: 'Honda',
  model: 'Prelude',
  price: 2000,
  person_id: 1
)