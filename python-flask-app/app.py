from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime, timedelta
import bcrypt
import jwt
import os
from functools import wraps

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb://mongo:27017/')
db = client['user_management']
users_collection = db['users']

SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token.split()[1], SECRET_KEY, algorithms=["HS256"])
            current_user = users_collection.find_one({'_id': ObjectId(data['user_id'])})
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

def serialize_user(user):
    user['_id'] = str(user['_id'])
    user['createdAt'] = user['createdAt'].isoformat() if 'createdAt' in user else None
    user['updatedAt'] = user['updatedAt'].isoformat() if 'updatedAt' in user else None
    if 'password' in user:
        del user['password']
    return user

@app.route('/api/signup', methods=['POST'])
def signup():
    user_data = request.json
    existing_user = users_collection.find_one({'user_id': user_data['user_id']})
    if existing_user:
        return jsonify({'message': 'User already exists'}), 400
    
    hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())
    new_user = {
        'user_id': user_data['user_id'],
        'password': hashed_password,
        'createdAt': datetime.utcnow(),
        'updatedAt': datetime.utcnow()
    }
    result = users_collection.insert_one(new_user)
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    auth = request.json
    user = users_collection.find_one({'user_id': auth['user_id']})
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    if bcrypt.checkpw(auth['password'].encode('utf-8'), user['password']):
        token = jwt.encode({'user_id': str(user['_id']), 'exp': datetime.utcnow() + timedelta(hours=24)}, SECRET_KEY, algorithm="HS256")
        return jsonify({'token': token})
    
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/users', methods=['GET'])
@token_required
def get_users(current_user):
    users = list(users_collection.find())
    return jsonify([serialize_user(user) for user in users])

@app.route('/api/users', methods=['POST'])
@token_required
def add_user(current_user):
    user = request.json
    user['createdAt'] = datetime.utcnow()
    user['updatedAt'] = user['createdAt']
    result = users_collection.insert_one(user)
    user['_id'] = str(result.inserted_id)
    return jsonify(serialize_user(user)), 201

@app.route('/api/users/<id>', methods=['GET'])
@token_required
def get_user(current_user, id):
    user = users_collection.find_one({'_id': ObjectId(id)})
    if user:
        return jsonify(serialize_user(user))
    return jsonify({'error': 'User not found'}), 404

@app.route('/api/users/<id>', methods=['PUT'])
@token_required
def update_user(current_user, id):
    user_data = request.json
    user_data['updatedAt'] = datetime.utcnow()
    result = users_collection.update_one(
        {'_id': ObjectId(id)}, 
        {'$set': user_data}
    )
    if result.modified_count:
        updated_user = users_collection.find_one({'_id': ObjectId(id)})
        return jsonify(serialize_user(updated_user))
    return jsonify({'error': 'User not found or no changes made'}), 404

@app.route('/api/users/<id>', methods=['DELETE'])
@token_required
def delete_user(current_user, id):
    result = users_collection.delete_one({'_id': ObjectId(id)})
    if result.deleted_count:
        return '', 204
    return jsonify({'error': 'User not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)