from flask import Flask, request, jsonify, redirect, render_template
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

from config import app
from handler.donation import DonationHandler
from handler.user import UserHandler
from handler.donation import DonationHandler


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
        elif search in ['no_request']:
            return DonationHandler.get_all_donations_without_request()
        else:
            return DonationHandler.get_all_donations()
    elif request.method == 'POST':
        return DonationHandler.create_donation(request.json)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/DAD/donations/<int:did>', methods=['GET', 'PUT', 'DELETE'])
def get_route_by_id(did):
    if request.method == 'GET':
        relationship = request.args.get('relationship', None)
        if relationship:
            return DonationHandler.get_donation_by_id(did, relationship)
        else:
            return DonationHandler.get_donation_by_id(did)
    elif request.method == 'PUT':
        return DonationHandler.update_donation(did, request.json)
    elif request.method == 'DELETE':
        return DonationHandler.delete_donation(did)
    else:
        return jsonify(message="Method not allowed."), 405

@app.route('/DAD/donations/user/<int:uid>', methods=['GET'])
def get_donations_by_user(uid):
    if request.method == 'GET':
        return DonationHandler().get_donations_by_user(uid)
    else:
        return jsonify(message="Method not allowed."), 405

    
@app.route('/DAD/donations/dates', methods = ['GET'])
def get_donations_by_date():
    return DonationHandler.get_donations_by_date()
	    
@app.route('/DAD/donations/dates_desc', methods = ['GET'])
def get_donations_by_date_desc():
    return DonationHandler.get_donations_by_date_desc()

@app.route('/DAD/donations/' , methods = ['GET'])
	def get_donations_by_supplyname():
	     if not request.args:
	            return DonationHandler.get_all_donations(search)
	        else:
	            return DonationHandler.searchBySupplyName(request.args)

if __name__ == '__main__':
    app.run()
