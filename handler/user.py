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
    dao = User()

    def get_all_users(self):
        try:
            users = self.dao.get_all_users()
            result_list = []
            for user in users:
                result_list.append(user.to_dict())
            result = {
                "message": "Success!",
                "users": result_list,
            }
            return jsonify(result), 200
        except:
            return jsonify(message="Server error!"), 500

    def get_user_by_id(self, uid):
        if uid:
            try:
                user = self.dao.get_user_by_id(uid)
                if not user:
                    return jsonify(Error="User Not Found"), 404
                else:
                    result = {
                        "message": "Success!",
                        "user": user.to_dict(),
                    }
                    return jsonify(result), 200
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad request!"), 400

    def create_user(self, json):
        valid_params = self.verify_params(json, User.USER_REQUIRED_PARAMETERS)
        if valid_params:
            try:
                new_user = User(**valid_params)
                created_user = new_user.create()
                result = {
                    "message": "Success!",
                    "user": created_user.to_dict(),
                }
                return jsonify(result), 201
            except:
                return jsonify(message="Server error!"), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def update_user(self, uid, json):
        if uid:
            try:
                user_to_update = self.dao.get_user_by_id(uid)
                if user_to_update:
                    valid_params = self.verify_params(json, User.USER_REQUIRED_PARAMETERS)
                    for key, value in valid_params.items():
                        if key == "password":
                            user_to_update.update_password(value)
                        else:
                            setattr(user_to_update, key, value)
                    user_to_update.update()
                    result = {
                        "message": "Success!",
                        "user": user_to_update.to_dict(),
                    }
                    return jsonify(result), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def delete_user(self, uid):
        if uid:
            try:
                user_to_delete = self.dao.get_user_by_id(uid)
                if user_to_delete:
                    user_to_delete.delete()
                    return jsonify(message="Success!"), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad Request!"), 400
