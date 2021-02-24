# DIY API... now with ejs

## Overview

Your mission is to add views onto a diy-api. The end product will be a server that serves html files instead of json data, so that we can interact with it via a web browser like chrome rather than postman.

This repo contains the working diy-api that we made as we reviewed the deliverable. This will be our starter code.

## Getting Set Up

- Fork and clone this repo
- `npm install`
- If you're on linux or windows, add your db username and password to `config/config.json`
- `sequelize db:create`, `sequelize db:migrate`, `sequelize db:seed:all`
- Start the server and interact with each endpoint via postman to make sure everything works

## Setting up ejs

- Install the packages `ejs`, `express-ejs-layouts`, & `method-override`

- In your middleware section of server.js: set your view engine, serve static files, use layouts, and use methodOverride

- Make a views directory, containing a layout.ejs, and a subfolder for each database table

## Core goals

1. The `GET /countries` (index) and `GET /countries/:id` (show) routes should render a ejs view file instead of json.
1. Each country name in the countries index page should be a link to that country's show page.
1. The countries index page should have a link to the form to make a new country. This link hits a `GET /countries/new` route, which renders the form. This form should create a new country when submitted.
1. Each country's show page should include a form to edit that country, as well as a button to delete it.

## Stretch goals

1. Add a continents index route that shows all existing continents. The countries index and the continents index should link to each other to ease user navigation.
1. Each continent's name on the continents index should link to that continent's show page.
1. The continent's show page should have the same functionality as the country's show page, plus the following functionality:
1. The continent's show page should have a link to a list of all countries in that continent. (This route already exists, but it needs to change so that it renders an ejs file instead of json.)
1. The continent's show page should have a link to a form that will create a new country within that continent. This link should hit the route `GET /continents/:id/countries/new`, and that route should render the form. You may need a hidden input for this!
