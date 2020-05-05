#!/usr/bin/env bash

sudo apt-get update
sudo apt install python3-pip -y
pip3 install flask
pip3 install flask-sqlalchemy
pip3 install psycopg2-binary
pip3 install flask_cors
pip3 install bcrypt
pip3 install gunicorn