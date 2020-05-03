from flask import jsonify
from dao.user import User


class BaseHandler:
    def verify_params(self, params, required_params):
        """
        Verify the validity of submitted parameter.
        :param params: submitted params
        :param required_params: list of required parameters
        :return: params, otherwise none
        """
        for param, value in params.items():
            if param in required_params and not value:
                return None
        return params


class UserHandler(BaseHandler):

    def build_user_dict(self, row):
        result = {}
        result['uid'] = row[0]
        result['ufirstname'] = row[1]
        result['ulastname'] = row[2]
        result['uemail'] = row[3]
        result['uphone'] = row[4]
        result['udate_birth'] = row[5]
        result['uaddress'] = row[6]
        result['ucity'] = row[7]
        result['uzipcode'] = row[8]
        result['ucountry'] = row[9]
        return result

    def build_user_attributes(self, uid, ufirstname, ulastname, uemail, uphone, udate_birth, uaddress, ucity, uzipcode, ucountry):
        result = {}
        result['uid'] = uid
        result['ufirstname'] = ufirstname
        result['ulastname'] = ulastname
        result['uemail'] = uemail
        result['uphone'] = uphone
        result['udate_birth'] = udate_birth
        result['uaddress'] = uaddress
        result['ucity'] = ucity
        result['uzipcode'] = uzipcode
        result['ucountry'] = ucountry
        return result 

    def get_all_users(self):
        dao = User()
        result = dao.get_all_users()
        result_list = []
        for row in result:
            result = self.build_user_dict(row)
            result_list.append(result)
        return jsonify(Users=result_list)

    def get_user_by_id(self, uid):
        dao = User()
        row = dao.get_user_by_id(uid)
        if not row:
            return jsonify(Error="User Not Found"), 404
        else:
            user = self.build_user_dict(row)
            return jsonify(User=user)

    def create_user(self, json):
        valid_params = self.verify_params(json, User.USER_REQUIRED_PARAMETERS)
        if valid_params:
            try:
                new_user = User(**valid_params)
                created_user = new_user.create()
                return created_user.to_json(), 201
            except:
                return "Server error!", 500
        else:
            return "Bad Request!", 400

    def update_user(self, uid, json):
        dao = User()
        if not dao.get_user_by_id(uid):
            return jsonify(Error="User not found."), 404
        else:
            ufirstname = json['ufirstname']
            ulastname = json['ulastname']
            uemail = json['uemail']
            uphone = json['uphone']
            udate_birth = json['udate_birth']
            uaddress = json['uaddress']
            ucity = json['ucity']
            uzipcode = json['uzipcode']
            ucountry = json['ucountry']

            if ufirstname and ulastname and uemail and uphone and udate_birth and uaddress and ucity and uzipcode and ucountry:
                dao = User()
                dao.update(uid, ufirstname, ulastname, uemail, uphone, udate_birth, uaddress, ucity, uzipcode, ucountry)
                result = self.build_user_attributes(uid, ufirstname, ulastname, uemail, uphone, udate_birth, uaddress, ucity, uzipcode, ucountry)
                return jsonify(User=result), 200
            else:
                return jsonify(Error="Unexpected attributes in update request"), 400

    def delete_user(self, uid):
        dao = User()
        if not dao.get_user_by_id(uid):
            return jsonify(Error="User not found."), 404
        else:
            dao.delete(uid)
            return jsonify(DeleteStatus="OK"), 200