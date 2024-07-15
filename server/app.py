# app.py

from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from config import Config
from db import db
from flask_migrate import Migrate
from flask_cors import CORS
from models import User, Property  # Import your models after db and app initialization

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
db.init_app(app)
migrate = Migrate(app, db)

app.config['SECRET_KEY'] = Config.SECRET_KEY
app.config['JWT_SECRET_KEY'] = Config.JWT_SECRET_KEY
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'username': user.username})
        return jsonify({'token': access_token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

# Endpoint to get all properties
@app.route('/api/properties', methods=['GET'])
def get_properties():
    properties = Property.query.all()
    return jsonify([prop.serialize() for prop in properties])

# Endpoint to search properties based on property_type and location
@app.route('/api/search', methods=['POST'])
def search_properties():
    try:
        data = request.get_json()
        property_type = data.get('property_type')
        location = data.get('location')

        if property_type and location:
            if property_type.lower() == 'land':
                # Replace with your logic for searching land properties
                # Example logic:
                # result = [loc for loc in landLocations if location.lower() in loc['location'].lower()]
                result = []
                return jsonify(result), 200
            else:
                properties = Property.query.filter_by(property_type=property_type, location=location).all()
        elif property_type:
            properties = Property.query.filter_by(property_type=property_type).all()
        elif location:
            properties = Property.query.filter_by(location=location).all()
        else:
            properties = Property.query.all()

        return jsonify([prop.serialize() for prop in properties]), 200

    except Exception as e:
        print(f"Error in search_properties: {str(e)}")
        return jsonify({'message': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
