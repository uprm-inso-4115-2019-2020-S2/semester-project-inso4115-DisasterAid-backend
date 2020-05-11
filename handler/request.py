from flask import jsonify
from dao.request import Request
from handler.user import BaseHandler


class RequestHandler(BaseHandler):
   
    @staticmethod
    def get_all_requests(supply_name=None, status=None):
        try:
            if supply_name:
                requests = Request.get_requests_by_supply_name(supply_name)
            elif status:
                requests = Request.get_requests_by_status(True) if status.lower() == 'true' \
                    else Request.get_requests_by_status()
            else:
                requests = Request.get_all_requests()
            result_list = []
            for row in requests:
                result_list.append(row.to_dict())
            result = {
                "message": "Success!",
                "requests": result_list,
            }
            return jsonify(result), 200
        except Exception as err:
            return jsonify(message="Server error!", error=err.__str__()), 500

    @staticmethod
    def get_request_by_id(rid):
        if rid:
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
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def create_request(json):
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
            except Exception as e:
                return jsonify(message="Server error!", error=e.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def update_request(rid, json):
        valid_params = RequestHandler.verify_params(json, Request.REQUEST_REQUIRED_PARAMS)
        if rid and valid_params:
            try:
                request_to_update = Request.get_request_by_id(rid)
                if request_to_update:
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
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
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
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400
