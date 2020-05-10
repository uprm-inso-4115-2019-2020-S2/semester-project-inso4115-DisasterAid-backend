from flask import jsonify

from dao.donation import Donation
from handler.user import BaseHandler


class DonationHandler(BaseHandler):
    @staticmethod
    def get_all_donations(available=None):
        try:
            donations = Donation.get_all_donations() if not available else Donation.get_available_donations()
            donation_list = [donation.to_dict() for donation in donations]
            result = {
                "message": "Success!",
                "donations": donation_list,
            }
            return jsonify(result), 200
        except Exception as err:
            return jsonify(message="Server error!", error=err.__str__()), 500

    @staticmethod
    def get_all_donations_without_request():
        try:
            donations = Donation.get_all_donations_without_request()
            donation_list = [donation.to_dict() for donation in donations]
            result = {
                "message": "Success!",
                "donations": donation_list,
            }
            return jsonify(result), 200
        except Exception as err:
            return jsonify(message="Server error!", error=err.__str__()), 500

    @staticmethod
    def get_donations_by_date():
        try:
            donations = Donation.get_donations_by_date()
            donation_list = [donation.to_dict() for donation in donations]
            result = {
                "message": "Success!",
                "donations": donation_list,
            }
            return jsonify(result), 200
        except Exception as err:
            return jsonify(message="Server error!", error=err.__str__()), 500

    @staticmethod
    def get_donations_by_supply_name(supply_name):
        try:
            donations = Donation.get_donations_by_supply_name(supply_name)
            donation_list = [donation.to_dict() for donation in donations]
            result = {
                "message": "Success!",
                "donations": donation_list,
            }
            return jsonify(result), 200
        except Exception as err:
            return jsonify(message="Server error!", error=err.__str__()), 500

    @staticmethod
    def get_donations_by_city(donation_city):
        try:
            donations = Donation.get_donations_by_city(donation_city)
            donation_list = [donation.to_dict() for donation in donations]
            result = {
                "message": "Success!",
                "donations": donation_list,
            }
            return jsonify(result), 200
        except Exception as err:
            return jsonify(message="Server error!", error=err.__str__()), 500

    @staticmethod
    def get_donation_by_id(did, relationship=None, city_property=None):
        if did:
            try:
                donation = Donation.get_donation_by_id(donation_id=did)
                if not donation:
                    return jsonify(message="Not Found!"), 404
                else:
                    result = {"message": "Success!"}
                    if relationship:
                        result['requests'] = donation.get_all_donation_requests()
                    else:
                        result['donation'] = donation.to_dict()
                        if city_property == 'city':
                            result['donation']['city'] = donation.get_city()
                    return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad request!"), 400

    @staticmethod
    def get_donations_by_user(uid):
        if uid:
            try:
                donations = Donation.get_donations_by_user(uid)
                result_list = [donation.to_dict() for donation in donations]
                result = {
                    "message": "Success!",
                    "donation": result_list
                }
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad request!"), 400

    @staticmethod
    def create_donation(json):
        valid_params = DonationHandler.verify_params(json, Donation.DONATION_REQUIRED_PARAMS)
        if valid_params:
            try:
                new_donation = Donation(**valid_params)
                created_donation = new_donation.create()
                result = {
                    "message": "Success!",
                    "donation": created_donation.to_dict(),
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def update_donation(did, json):
        valid_params = DonationHandler.verify_params(json, Donation.DONATION_REQUIRED_PARAMS)
        if did and valid_params:
            try:
                donation_to_update = Donation.get_donation_by_id(did)
                if donation_to_update:
                    for key, value in valid_params.items():
                        setattr(donation_to_update, key, value)
                    donation_to_update.update()
                    result = {
                        "message": "Success!",
                        "donation": donation_to_update.to_dict(),
                    }
                    return jsonify(result), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Server Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def delete_donation(did):
        if did:
            try:
                donation_to_delete = Donation.get_donation_by_id(did)
                if donation_to_delete:
                    donation_to_delete.delete()
                    return jsonify(message="Success!"), 200
                else:
                    return jsonify(message="Not Found!"), 404
            except Exception as err:
                return jsonify(message="Sever Error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400
