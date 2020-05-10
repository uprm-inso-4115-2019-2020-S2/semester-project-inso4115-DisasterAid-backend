import json
from datetime import datetime
from uuid import UUID

from sqlalchemy.ext.declarative import DeclarativeMeta


class OutputMixin:
    RELATIONSHIPS_TO_DICT = False

    def __iter__(self):
        return self.to_dict().iteritems()

    def to_dict(self, rel=None):
        if rel is None:
            rel = self.RELATIONSHIPS_TO_DICT
        res = {column.key: getattr(self, attr)
               for attr, column in self.__mapper__.c.items()}
        if rel:
            for attr, relation in self.__mapper__.relationships.items():
                value = getattr(self, attr)
                if isinstance(value, list):
                    res[relation.key] = [obj.pk for obj in getattr(self, attr)]
                else:
                    res[relation.key] = value.pk
        return res

    def to_json(self, rel=None):
        def extended_encoder(x):
            if isinstance(x, datetime):
                return x.isoformat()
            if isinstance(x, UUID):
                return str(x)
        if rel is None:
            rel = self.RELATIONSHIPS_TO_DICT
        return json.dumps(self.to_dict(rel), default=extended_encoder)
