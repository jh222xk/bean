Bean
===========

# API
The API used can be found here: http://128.199.44.244:1337/

Username: `admin`
Password: `admin`

# Run the application

## Get the project
First of all clone this repository: `git clone https://github.com/jh222xk/bean.git`

## Install dependencies
You need to have npm installed and when you have just run `npm install`
then run `bower install` (If you get something like `Unable to find a suitable version for...`
always choose 1.4 (and is required by bean).

## Run it
Just run: `gulp serve` and a server will listen to `http://localhost:3000`

# What I have changed in the API
I have added image and description to the coffeehouses, added CORS, added more things to the elasticsearch indexes.
I had to add the id to the serializers so I easily could use it within the app later on.
