from flask import Flask, request, jsonify, redirect, render_template
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

from config import app
from handler.user import UserHandler
from handler.donation import DonationHandler


@app.route('/')
def index():
    return 'Welcome to Disaster Aid Distribution App!'


@app.route("/DAD/users", methods=['GET', 'POST'])
def getall_or_create_users():
    if request.method == 'GET':
        return UserHandler().get_all_users()
    elif request.method == 'POST':
        return UserHandler().create_user(request.json)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/DAD/users/<int:uid>', methods=['GET', 'PUT', 'DELETE'])
def get_user_by_id(uid):
    if request.method == 'GET':
        return UserHandler().get_user_by_id(uid)
    elif request.method == 'PUT':
        return UserHandler().update_user(uid, request.json)
    elif request.method == 'DELETE':
        return UserHandler().delete_user(uid)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route("/DAD/donations", methods=['GET', 'POST'])
def getall_or_create_donations():
    if request.method == 'GET':
        return DonationHandler().get_all_donations()
    elif request.method == 'POST':
        return DonationHandler().create_donation(request.json)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/DAD/donations/<int:did>', methods=['GET', 'PUT', 'DELETE'])
def get_donation_by_id(did):
    if request.method == 'GET':
        return DonationHandler().get_donation_by_id(did)
    elif request.method == 'PUT':
        return DonationHandler().update_donation(did, request.json)
    elif request.method == 'DELETE':
        return DonationHandler().delete_donation(did)
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/DAD/donations/available', methods=['GET'])
def get_available_donations():
    if request.method == 'GET':
        return DonationHandler().get_available_donations()
    else:
        return jsonify(message="Method not allowed."), 405


@app.route('/DAD/donations/byUser/<int:uid>', methods=['GET'])
def get_donations_by_user(uid):
    if request.method == 'GET':
        return DonationHandler().get_donations_by_user(uid)
    else:
        return jsonify(message="Method not allowed."), 405

@app.route('/DAD/donations/did/address', methods=['GET'])
def get_donation_address(did):
    if request.method == 'GET':
        return DonationHandler().get_donation_address(did)
    else:
        return jsonify(message="Method not allowed."), 405

if __name__ == '__main__':
    app.run()
