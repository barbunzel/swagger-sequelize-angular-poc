# Practical Test
By: Luis Diego Hernandez
https://sv.linkedin.com/in/dieguito
luis.dieguito@gmail.com

## Install MySQL server

If you are using Debian or Ubuntu, use the APT repository to install MySQL server
  `sudo apt-get install mysql-server`

If you are using a different distribution of Linux, refer to the official documentation:
https://dev.mysql.com/doc/refman/5.7/en/linux-installation.html

When prompted, type a password for the `root` user to access MySQL.

## Install Node.js and NPM

Make sure you have Node installed on your machine (NPM will be installed along with Node).

Check the Node.js downloads page for information on how to install:

https://nodejs.org/en/download/

## Install Swagger

To install Swagger, use `npm`:

`npm install -g swagger`

You might need to add `sudo` to install globally:

`sudo npm install -g swagger`

## Configure the project for the first time

Make sure the current directory is the project directory. Once there, install all dependencies:

`npm install`

Run the MySQL script to create the database and user to use with the project:

`bash db.sh`

## Running the project

To start the project, use Swagger:

`swagger project start`

The project will run in `localhost:10010`

