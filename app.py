from flask import Flask, request, jsonify, redirect
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

from config import app
from handler.donation import DonationHandler
from handler.user import UserHandler
from handler.request import RequestHandler


@app.route('/')
def index():
    return 'Welcome to Disaster Aid Distribution App!'

# USER ENDPOINTS
@app.route("/DAD/users", methods=['GET', 'POST'])
def get_all_or_create_users():
    if request.method == 'GET':
        return UserHandler.get_all_users()
    elif request.method == 'POST':
        return UserHandler.create_user(request.json)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/DAD/users/<int:uid>', methods=['GET', 'PUT', 'DELETE'])
def get_user_by_id(uid):
    if request.method == 'GET':
        # Example of query parameters "/DAD/users/1?relationship=[requests|donations]"
        # This enables to get all the requests or donations associated to the user.
        # Otherwise, this will search an user by id.
        get_relationship = request.args.get('relationship', None)
        if get_relationship in ['requests', 'donations']:
            return UserHandler.get_user_by_id(uid, get_relationship)
        else:
            return UserHandler.get_user_by_id(uid)
    elif request.method == 'PUT':
        return UserHandler.update_user(uid, request.json)
    elif request.method == 'DELETE':
        return UserHandler.delete_user(uid)
    else:
        return jsonify(message="Method not allowed."), 405

# DONATIONS ENDPOINTS
@app.route('/DAD/donations', methods=['GET', 'POST'])
def get_all_or_create_donations():
    if request.method == 'GET':
        search = request.args.get('search', None)
        if search in ['available']:
            return DonationHandler.get_all_donations(search)
        else:
            return DonationHandler.get_all_donations()
    elif request.method == 'POST':
        return DonationHandler.create_donation(request.json)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/DAD/donations/<int:did>', methods=['GET', 'PUT', 'DELETE'])
def get_donation_by_id(did):
    if request.method == 'GET':
        relationship = request.args.get('relationship', None)
        city_property = request.args.get('property', None)
        if relationship:
            return DonationHandler.get_donation_by_id(did=did, relationship=relationship)
        else:
            if city_property:
                return DonationHandler.get_donation_by_id(did=did, city_property=city_property)
            return DonationHandler.get_donation_by_id(did)
    elif request.method == 'PUT':
        return DonationHandler.update_donation(did, request.json)
    elif request.method == 'DELETE':
        return DonationHandler.delete_donation(did)
    else:
        return jsonify(message="Method not allowed."), 405


# USER ENDPOINTS
@app.route("/DAD/request", methods=['GET', 'POST'])
def requests():
    if request.method == 'GET':
        return RequestHandler().get_all_requests()
    elif request.method == 'POST':
        return RequestHandler().create_request(request.json)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route("/DAD/requests/<int:rid>", methods=['GET', 'PUT', 'DELETE'])
def request_update(rid):
    if request.method == 'GET':
        return RequestHandler().get_request_by_id(rid)
    elif request.method == 'PUT':
        return RequestHandler().update_request(rid, request.json)
    elif request.method == 'DELETE':
        return RequestHandler().delete_request(rid)
    else:
        return jsonify(message="Method not allowed."), 405


if __name__ == '__main__':
    app.run()
