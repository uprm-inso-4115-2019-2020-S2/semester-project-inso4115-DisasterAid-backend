import datetime

from config import db
from dao.mixin import OutputMixin


class Request(OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    REQUEST_REQUIRED_PARAMS = ['supplyName', 'status', 'description', 'uid', 'did']
    RESQUEST_STATUS_TYPES = ['pending', 'delivered', 'accepted']

    rid = db.Column(db.Integer, primary_key=True)
    supplyName = db.Column(db.String(50), nullable=False)
    time = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    status = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(100))
    uid = db.Column(db.Integer, db.ForeignKey('user.uid'), nullable=False)
    did = db.Column(db.Integer, db.ForeignKey('donation.did'), nullable=False)

    def __init__(self, **kwargs):
        self.supplyName = kwargs.get('supplyName')
        self.status = kwargs.get('status')
        self.description = kwargs.get('description')
        self.uid = kwargs.get('uid')
        self.did = kwargs.get('did')

    def __repr__(self):
        return self.supplyName

    @property
    def pk(self):
        return self.rid

    @staticmethod
    def get_all_requests():
        return Request.query.all()

    @staticmethod
    def get_request_by_id(request_id):
        return Request.query.filter_by(rid=request_id).first()

    @staticmethod
    def get_requests_by_uid(user_id):
        return Request.query.filter_by(uid=user_id).all()

    @staticmethod
    def get_requests_by_supply_name(supply_name):
        return Request.query.filter(Request.supplyName.ilike(supply_name)).all()

    @staticmethod
    def get_requests_by_status(val="Pending"):
        return Request.query.filter(Request.status.ilike(val)).all()

    @staticmethod
    def get_requests_by_user(user_id):
        return Request.query.filter_by(uid=user_id).all()

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
