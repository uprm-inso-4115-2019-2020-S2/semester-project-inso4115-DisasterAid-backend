import datetime

from config import db
from dao.mixin import OutputMixin


class Donation(OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    DONATION_REQUIRED_PARAMS = ['supplyName', 'quantity', 'unit', 'uid']

    did = db.Column(db.Integer, primary_key=True)
    supplyName = db.Column(db.String(30), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    unit = db.Column(db.String(30), nullable=False)
    uid = db.Column(db.Integer, db.ForeignKey('user.uid'), nullable=False)
    requests = db.relationship('Request', backref=db.backref('donation', lazy='subquery'), lazy=True)

    def __init__(self, **kwargs):
        self.supplyName = kwargs.get('supplyName')
        self.quantity = kwargs.get('quantity')
        self.unit = kwargs.get('unit')
        self.uid = kwargs.get('uid')

    def __repr__(self):
        return self.supplyName

    @property
    def pk(self):
        return self.did

    @staticmethod
    def get_all_donations():
        return Donation.query.all()

    @staticmethod
    def get_all_donations_without_request():
        return Donation.query.filter(Donation.requests == None)

    @staticmethod
    def get_donation_by_id(donation_id):
        return Donation.query.filter_by(did=donation_id).first()

    @staticmethod
    def get_available_donations():
        return Donation.query.filter(Donation.quantity != 0)

    def get_all_donation_requests(self):
        donation = self.get_donation_by_id(self.did)
        return [req.to_dict(rel=False) for req in donation.requests]

    @staticmethod
    def get_donations_by_user(user_id):
        return Donation.query.filter_by(uid=user_id)

    # @staticmethod
    # def get_supply_count(supply):
    #     pass

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def update(self):
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()
