from flask import Flask, request, jsonify, redirect
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

from config import app
from handler.user import UserHandler


@app.route('/')
def hello_world():
    return 'Welcome to Disaster Aid Distribution App!'


@app.route("/DAD/register", methods=['POST'])
def register_user():
    return UserHandler().create_user(request.json)


@app.route("/DAD/user", methods=['GET'])
def get_all_users():
    return UserHandler().get_all_users()


@app.route('/DAD/user/<int:uid>', methods=['GET', 'PUT', 'DELETE'])
def get_user_by_id(uid):
    if request.method == 'GET':
        return UserHandler().get_user_by_id(uid)
    elif request.method == 'PUT':
        return UserHandler().update_user(uid, request.json)
    elif request.method == 'DELETE':
        return UserHandler().delete_user(uid)
    else:
        return jsonify(Error="Method not allowed."), 405


if __name__ == '__main__':
    app.run(debug=True)
