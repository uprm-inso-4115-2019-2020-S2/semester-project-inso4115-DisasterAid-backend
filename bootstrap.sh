#!/usr/bin/env bash

sudo apt-get update
sudo apt install python3-pip -y
pip3 install flask
pip3 install flask-sqlalchemy
pip3 install psycopg2-binary
pip3 install flask_cors
pip3 install bcrypt
pip3 install gunicorn
sudo apt-get update -y
sudo apt-get install postgresql postgresql-contrib -y
sudo apt-get install pgadmin3 -y
sudo -i -u postgres
createuser insouser -e -P
inso4115
inso4115
createdb DisasterAid
psql DisasterAid
grant all privileges on database "DisasterAid" to insouser;
\q
exit
python3 /vagrant/setUpDB.py