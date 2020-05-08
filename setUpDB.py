from config import db
from dao.user import User
from dao.request import Request
from dao.donation import Donation

db.drop_all()
db.create_all()

# TODO: populate database
