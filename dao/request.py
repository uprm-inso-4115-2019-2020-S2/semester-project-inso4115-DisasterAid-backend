import datetime

from config import db
from dao.mixin import OutputMixin


class Request(OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    REQUEST_REQUIRED_PARAMS = ['supplyName', 'time', 'status', 'description', 'uid', 'did']

    rid = db.Column(db.Integer, primary_key=True)
    supplyName = db.Column(db.String(50), nullable=False)
    time = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    status = db.Column(db.Boolean, nullable=False)
    description = db.Column(db.String(100))
    uid = db.Column(db.Integer, db.ForeignKey('user.uid'), nullable=False)
    did = db.Column(db.Integer, db.ForeignKey('donation.did'), nullable=False)

    def __repr__(self):
        return self.supplyName

    @property
    def pk(self):
        return self.rid

    def get_all_requests(self):
        return self.query.all()

    @staticmethod
    def get_request_by_id(request_id):
        return Request.query.filter_by(rid=request_id)

    def create(self, user):
        user.requests.append(self)
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
