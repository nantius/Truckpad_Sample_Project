# Truckpad_Sample_Project

## Setup
* yarn 
* docker run --name truckpad -p 5432:5432 -e POSTGRES_USER=truckpad -e POSTGRES_PASSWORD=truckpad -e POSTGRES_DB=truckpad -d postgres
* yarn typeorm migration:run
* yarn dev:server

## Testing
* yarn test

## Routes

-> Drivers
* GET   /drivers/no_cargo
* GET   /drivers/own_vehicle
* POST  /drivers 
* PUT   /drivers/:uuid

-> Locations
* GET   /locations
* GET   /locations/list_by_type
* POST  /locations

-> Trips
* GET   /trips
* GET   /trips/by_driver/:driverId
* POST  /trips
* POST  /trips/finish_trip/:tripId
* POST  /trips/number_of_trips_time_and_location
