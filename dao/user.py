import bcrypt as bcrypt

from config import db
from dao.mixin import OutputMixin
from dao.request import Request
from dao.donation import Donation


class User(OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    USER_REQUIRED_PARAMETERS = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'city',
                                'zipCode', 'country', 'username', 'password']

    uid = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(30), nullable=False)
    lastName = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(30), nullable=False)
    phone = db.Column(db.String(10), nullable=False)
    dateOfBirth = db.Column(db.Date, nullable=False)
    address = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(20), nullable=False)
    zipCode = db.Column(db.String(10), nullable=False)
    country = db.Column(db.String(20), nullable=False)
    requests = db.relationship('Request', backref=db.backref('user', lazy='subquery'), lazy=True)
    donations = db.relationship('Donation', backref=db.backref('user', lazy='subquery'), lazy=True)
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return self.full_name

    @property
    def full_name(self):
        return "%s %s" % (self.firstName, self.lastName)

    def get_all_users(self):
        return self.query.all()

    def get_user_by_id(self, user_id):
        return self.query.filter_by(uid=user_id).first()

    def create(self):
        self.password = bcrypt.hashpw(self.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        db.session.add(self)
        db.session.commit()
        return self

    def update(self):
        db.session.add(self)
        db.session.commit()
        return self

    def update_password(self, new_password):
        self.password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()
