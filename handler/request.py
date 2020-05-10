from flask import jsonify
from dao.request import Request
from handler.user import BaseHandler


class RequestHandler(BaseHandler):
    # def __init__(self):
    #     print("lol")

    # def build_request_dict(self, row):  # row is a python list
    #     result = {}
    #     result['rid'] = row[0]
    #     result['supplyName'] = row[1]
    #     result['time'] = row[2]
    #     result['status'] = row[3]
    #     result['description'] = row[4]
    #     result['uid'] = row[5]
    #     result['did'] = row[6]
    #     return result

    @staticmethod
    def get_all_requests():
        try:
            requests = Request().get_all_requests()
            result_list = []
            for row in requests:
                result_list.append(row.to_dict())
            result = {
                "message": "Success!",
                "requests": result_list,
            }
            print(result_list)
            return jsonify(result), 200
        except:
            return jsonify(message="Server error!"), 500

    @staticmethod
    def get_request_by_id(rid):
        if rid > 0:
            try:
                request = Request.get_request_by_id(rid)
                if not request:
                    return jsonify(message="Not Found!"), 404
                else:
                    result = {
                        "message": "Success!",
                        "requests": request.to_dict(),
                    }
                    return jsonify(result), 200
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def insert_request(json):
        valid_params = RequestHandler.verify_params(json, Request.REQUEST_REQUIRED_PARAMS)
        if valid_params:
            try:
                new_request = Request(**valid_params)
                created_request = new_request.create()
                result = {
                    "message": "Success!",
                    "user": created_request.to_dict(),
                }
                return jsonify(result), 201
            except:
                return jsonify(message="Server error!"), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def update_request(rid, json):
        if rid:
            try:
                request_to_update = Request.get_request_by_id(rid)
                if request_to_update:
                    valid_params = RequestHandler.verify_params(json, Request.REQUEST_REQUIRED_PARAMS)
                    for key, value in valid_params.items():
                        if key in Request.REQUEST_REQUIRED_PARAMS:
                            setattr(request_to_update, key, value)
                    request_to_update.update()
                    result = {
                        "message": "Success!",
                        "user": request_to_update.to_dict(),
                    }
                    return jsonify(result), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def delete_request(rid):
        if rid:
            try:
                request_to_delete = Request.get_request_by_id(rid)
                if request_to_delete:
                    request_to_delete.delete()
                    return jsonify(message="Success!"), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad Request!"), 400
