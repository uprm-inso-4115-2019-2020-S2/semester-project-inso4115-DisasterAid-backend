# Disaster Aid Distribution Backend
Disaster Aid Distribution backend done in Flask, SQLAlchemy and PostgreSQL.

Visit the latest version [here](https://disaster-aid-app.herokuapp.com/).

## Requirements
* Python 3.6 or greater
* PostgreSQL v10 (make sure to include pgAdmin in the installation), [download here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

## Installation
### Setting up the virtual environment
Install virtualenv package:
```bash
$ pip install virtualenv
```

Create virtual environment, on project folder run:
```bash
$ virtualenv venv
```

Activate virtual environment by running the following command:

* Windows: 
```bash
> source \env\Scripts\activate.bat
```
* Linux/MAC OS: 
```bash
$ source env/bin/activate
```

Install project dependencies in the virtual environment:
```bash
(venv) ..$ pip install -r requirements.txt
```

### Setup local database with pgAdmin
Note: This instructions are based on pgAdmin3 (similar to pgAdmin4)

#### Create new server 
Make sure to set up the following properties:
* name: _whatever you like_
* host: localhost
* port: 5432
* maintenance_db: postgres
* username: postgres

Click OK to create the new server.

### Create a new login role
In Login Roles create a new role with the following properties: `role_name: insouser`

In Define, specify the password: `password: inso4115`

In Role privileges, select the options: 
* Can Login
* Can create databases
* Can create roles
* Can initiate streaming replication and backups 

Press OK and continue.

### Create Database
In Databases, create a new database named **DisasterAid** and set the owner to **insouser**.

## Run the application
This section contains instruction son how to run the Flask application in development and debug mode enabled.
Make sure to have your **venv** activated.

We must first specify three environment variables to tell Flask to run the application on these configurations.
On the project folder, open a terminal and create three environment variables:

If your using Windows:
```bash
(venv) ..> set FLASK_APP=app.py
(venv) ..> set FLASK_ENV=development
(venv) ..> set FLASK_DEBUG=1
```

If you using Linux/MAC OS:
```bash
(venv) ..$ export FLASK_APP=app.py
(venv) ..$ export FLASK_ENV=development
(venv) ..$ export FLASK_DEBUG=1
```

Note: these environment variables are stored only for the current session, i.e. if you close the current session you need to create them again.

To run the application simply run:
```bash
(venv) ..$ flask run

(you should get something like this)
* Serving Flask app "app.py" (lazy loading)
* Environment: development
* Debug mode: on
...
```

## Create database tables
When you have the app running, open a separate terminal and run:
```bash
(venv) ..$ python setUpDB.py 
``` 

Your all set, happy coding!