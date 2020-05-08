import datetime

from config import db
from dao.mixin import OutputMixin


class Donation(OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    DONATION_REQUIRED_PARAMS = ['supplyName', 'quantity', 'unit', 'createdAt', 'uid']

    did = db.Column(db.Integer, primary_key=True)
    supplyName = db.Column(db.String(30), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    unit = db.Column(db.String(30), nullable=False)
    uid = db.Column(db.Integer, db.ForeignKey('user.uid'), nullable=False)
    requests = db.relationship('Request', backref=db.backref('donation', lazy='subquery'), lazy=True)

    def __repr__(self):
        return self.supplyName

    @property
    def pk(self):
        return self.did

    def get_all_donations(self):
        return self.query.all()

    def get_donation_by_id(self, donation_id):
        return self.query.filter_by(uid=donation_id).first()

    def create(self, user, request):
        user.donations.append(self)
        request.donation.append(self)
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
