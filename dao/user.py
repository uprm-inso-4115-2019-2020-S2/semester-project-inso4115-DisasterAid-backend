import bcrypt as bcrypt

from config import db
from dao.mixin import OutputMixin


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

    def __init__(self, **kwargs):
        self.firstName = kwargs.get('firstName')
        self.lastName = kwargs.get('lastName')
        self.email = kwargs.get('email')
        self.phone = kwargs.get('phone')
        self.dateOfBirth = kwargs.get('dateOfBirth')
        self.address = kwargs.get('address')
        self.city = kwargs.get('city')
        self.zipCode = kwargs.get('zipCode')
        self.country = kwargs.get('country')
        self.username = kwargs.get('username')
        self.password = kwargs.get('password')

    def __repr__(self):
        return self.full_name

    @property
    def full_name(self):
        return "%s %s" % (self.firstName, self.lastName)

    @property
    def pk(self):
        return self.uid

    @staticmethod
    def do_login(json):
        return User.query.filter_by(username=json['username']).first()

    @staticmethod
    def get_all_users():
        return User.query.all()

    def get_all_user_relationship_values(self, rel):
        user = self.get_user_by_id(user_id=self.uid)
        return [val.to_dict(rel=False) for val in getattr(user, rel)]

    @staticmethod
    def get_user_by_id(user_id):
        return User.query.filter_by(uid=user_id).first()

    @staticmethod
    def verify_username(username):
        obj = User.query.filter(User.username == username).first()
        print(obj)
        return True if obj else False

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
