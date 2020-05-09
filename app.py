from flask import Flask, request, jsonify, redirect
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

from flask import render_template, url_for, redirect, send_from_directory, make_response
import os

from config import app
from handler.user import UserHandler


@app.route('/')
def index():
    return 'Welcome to Disaster Aid Distribution App!'


@app.route('/Login') 
def g():
    return 'Login html page goes here'

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


if __name__ == '__main__':
    app.run(debug = True)
    # adding debug = True to run method gives flask live reload 