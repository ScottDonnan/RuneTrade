# README

## Description:
https://runetrade.herokuapp.com/

RuneTrade is a digital card-trading application that allows a user to collect their own “set” of cards through a randomized process and trade those cards with other users through an open market process.

Utilized React.js for client side development.

## Dependencies:
postgresql: use postgresql as the database for application

bcrypt: for secure user login and Active Model "has_secure_password" 

active_model_serializer: 

figaro: use to create secure environment variable for storing email username and password

## Getting Started:

Scripts to start up application

### `npm install`
    to install required react dependancies

### `rails db:migrate`
    create database tables

### `rails db:seed`
    populate card data to postgresql database tables
    
### `rails server`
    run development server


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start --prefix client`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

