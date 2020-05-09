from flask import jsonify
from dao.request import Request


class RequestHandler:
    # def __init__(self):
    #     print("lol")


    def build_request_dict(self, row):  # row is a python list
        result = {}
        result['rid'] = row[0]
        result['supplyName'] = row[1]
        result['time'] = row[2]
        result['status'] = row[3]
        result['description'] = row[4]
        result['uid'] = row[5]
        result['did'] = row[6]
        return result

    def get_all_requests(self):
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

    # def get_all_requests_by_id(uid):

    #
    # @staticmethod
    # def get_all_requests():
    #     try:
    #         requests = Request().get_all_requests()
    #         request_list = [request.to_dict() for request in requests]
    #         result = {
    #
    #             "requests": request_list,
    #         }
    #         return jsonify(result), 200
    #     except:
    #         return jsonify(message="Server error!"), 500

    def get_request_by_id(self, uid):
        if uid > 0:
            try:
                request = Request().get_request_by_user_id(uid)
                if not request:
                    return jsonify(message="Not Found!"), 404
                else:
                    result_list = []
                    for row in request:
                        result_list.append(self.build_request_dict(row))
                    result = {
                        "message": "Success!",
                        "requests": result_list,
                    }
                    print(result_list)
                    return jsonify(result), 200
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad Request!"), 400


    # @staticmethod
    # def create_request(json):
    #     valid_params = RequestHandler.verify_params(json, Request.DONATION_REQUIRED_PARAMS)
    #     if valid_params:
    #         try:
    #             new_request = Request(**valid_params)
    #             created_request = new_request.create()
    #             result = {
    #                 "message": "Success!",
    #                 "request": created_request.to_dict(),
    #             }
    #             return jsonify(result), 201
    #         except:
    #             return jsonify(message="Server error!"), 500
    #     else:
    #         return jsonify(message="Bad Request!"), 400


    # def update_request(self, rid):
    #     if rid > 0:
    #         try:
    #             request = Request().get_request_by_id(rid)
    #             if not request:
    #                 return jsonify(message="Not Found!"), 404
    #             else:
    #
    #                 result_list = list()
    #                 for row in request:
    #                     result_list.append(row.to_dict())
    #                 result = {
    #                     "message": "Success!",
    #                     "requests": result_list,
    #                 }
    #                 return jsonify(result), 200
    #         except:
    #             return jsonify(message="Server Error!"), 500
    #     else:
    #         return jsonify(message="Bad Request!"), 400