from flask import jsonify
from dao.donation import Donation
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


class DonationHandler(BaseHandler):
    dao = Donation()

    def build_donation_dict(self, donation):
        result = {}
        result['supplyName'] = getattr(donation, 'supplyName')
        result['quantity'] = getattr(donation, 'quantity')
        result['createdAt'] = getattr(donation, 'createdAt')
        result['unit'] = getattr(donation, 'unit')
        result['uid'] = getattr(donation, 'uid')
        return result

    def get_all_donations(self):
        try:
            donations = self.dao.get_all_donations()
            result_list = []
            for d in donations:
                result_list.append(self.build_donation_dict(d))
            result = {
                "message": "Success!",
                "donations": result_list,
            }
            return jsonify(result), 200
        except:
            return jsonify(message="Server error!"), 500

    def get_donation_by_id(self, did):
        if did:
            try:
                donation = self.dao.get_donation_by_id(did)
                if not donation:
                    return jsonify(Error="donation Not Found"), 404
                else:
                    result = {
                        "message": "Success!",
                        "donation": self.build_donation_dict(donation),
                    }
                    return jsonify(result), 200
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad request!"), 400

    def get_available_donations(self):
        try:
            donations = self.dao.get_available_donations()
            result_list = []
            for d in donations:
                result_list.append(self.build_donation_dict(d))
            result = {
                "message": "Success!",
                "donations": result_list,
            }
            return jsonify(result), 200
        except:
            return jsonify(message="Server error!"), 500

    def get_donations_by_user(self, uid):
        if uid:
            try:
                donations = self.dao.get_donations_by_user(uid)
                result_list = []
                for d in donations:
                    result_list.append(self.build_donation_dict(d))
                else:
                    result = {
                        "message": "Success!",
                        "donation": result_list
                    }
                    return jsonify(result), 200
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad request!"), 400

    def get_donation_address(self, did):
        if did:
            try:
                address = self.dao.get_donation_address(did)
                if not address:
                    return jsonify(message="Address Not Found!"), 404
                else:
                    result = {
                       "message": "Success!",
                        "address": address.to_dict()
                    }  
                    return jsonify(result), 200
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad request!"), 400            

    def create_donation(self, json):
        valid_params = self.verify_params(json, Donation.DONATION_REQUIRED_PARAMETERS)
        if valid_params:
            try:
                user = User().get_user_by_id(valid_params["uid"])
                new_donation = Donation(supplyName=valid_params["supplyName"], quantity=valid_params["quantity"], createdAt=valid_params["createdAt"], unit=valid_params["unit"])
                created_donation = new_donation.create(user)
                result = {
                    "message": "Success!",
                    "donation": "",
                }
                return jsonify(result), 201
            except:
                return jsonify(message="Server error!"), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def update_donation(self, did, json):
        if did:
            try:
                donation_to_update = self.dao.get_donation_by_id(did)
                #If parameter is defined in update json, change it
                if json.get("supplyName"): donation_to_update.supplyName = json.get("supplyName")
                if json.get("quantity"): donation_to_update.quantity = json.get("quantity")
                if json.get("createdAt"): donation_to_update.createdAt = json.get("createdAt")
                if json.get("unit"): donation_to_update.unit = json.get("unit")
                #add updated donation
                donation_to_update.update()
                result = {
                    "message": "Success!",
                    "donation": "",
                }
                return jsonify(result), 201
            except:
                return jsonify(message="Server error!"), 500
        else:
            return jsonify(message="Bad Request!"), 400
    
    def delete_donation(self, did):
        if did:
            try:
                donation = self.dao.get_donation_by_id(did)
                if not donation:
                    return jsonify(Error="donation Not Found"), 404
                else:
                    self.dao.delete(did)
                    result = {
                        "message": "Success!",
                        "donation": "",
                    }
                    return jsonify(result), 200
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad request!"), 400

