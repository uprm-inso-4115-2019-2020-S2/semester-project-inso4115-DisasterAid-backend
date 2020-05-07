import datetime

from config import db
from dao.mixin import OutputMixin


class Donation(OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    DONATION_REQUIRED_PARAMETERS = ['supplyname', 'quantity', 'createdAt', 'unit']

    did = db.Column(db.Integer, primary_key=True)
    supplyName = db.Column(db.String(30), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    unit = db.Column(db.String(30), nullable=False)
    uid = db.Column(db.Integer, db.ForeignKey('user.uid'), nullable=False)

    def get_all_donations(self):
        return self.query.all()

    def get_donation_by_id(self, donation_id):
        return self.query.filter_by(did=donation_id).first()

    def create(self, user):
        user.donations.append(self)
        db.session.commit()