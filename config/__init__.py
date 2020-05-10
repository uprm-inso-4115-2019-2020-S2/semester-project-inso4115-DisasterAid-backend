from os import environ

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

DEV_DB = 'postgresql://insouser:inso4115@localhost/DisasterAid'
# LINE BELOW IS FOR WHEN WE WANT TO RUN ON HEROKU
# DEV_DB = 'postgres://yukoojywyelupb:535a04c9549446512e582543c0d78e6844f1c2363eb646149845abf854592b65@ec2-3-230-106-126.compute-1.amazonaws.com:5432/dc08d0ste8gj9e'
app = Flask(__name__)

if 'DATABASE_URL' in environ:
    app.config['SQLALCHEMY_DATABASE_URI'] = environ['DATABASE_URL']
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = DEV_DB

db = SQLAlchemy(app)
CORS(app)
