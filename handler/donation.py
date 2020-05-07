from flask import jsonify
from dao.donation import Donation


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

    def get_all_donations(self):
        try:
            donations = self.dao.get_all_donations()
            result_list = []
            for d in donations:
                result_list.append(d.to_dict())
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
                        "donation": donation.to_dict(),
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
                new_donation = Donation(**valid_params)
                created_donation = new_donation.create()
                result = {
                    "message": "Success!",
                    "donation": created_donation.to_dict(),
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
                if donation_to_update:
                    valid_params = self.verify_params(json, Donation.DONATION_REQUIRED_PARAMETERS)
                    for key, value in valid_params.items():
                        if key == "password":
                            donation_to_update.update_password(value)
                        else:
                            setattr(donation_to_update, key, value)
                    donation_to_update.update()
                    result = {
                        "message": "Success!",
                        "donation": donation_to_update.to_dict(),
                    }
                    return jsonify(result), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def delete_donation(self, did):
        if did:
            try:
                donation_to_delete = self.dao.get_donation_by_id(did)
                if donation_to_delete:
                    donation_to_delete.delete()
                    return jsonify(message="Success!"), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except:
                return jsonify(message="Server Error!"), 500
        else:
            return jsonify(message="Bad Request!"), 400