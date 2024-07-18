from flask import Flask, request, jsonify, render_template, send_from_directory
from backend.models import Users
from backend.config import db, app
from werkzeug.exceptions import BadRequest
import bcrypt


@app.route('/')
def home():
    return send_from_directory('../frontend/dist', 'index.html')


@app.route('/signup', methods=["POST"])
def signup():
    username = request.json.get('username')
    email = request.json.get("email")
    password = request.json.get("password")
    masked_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    if not username or not email or not password:
        return ({"message": "Fill all fields"})
    
    new_user = Users(username=username, email=email, password=masked_password)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return ({"message": "User created!"}), 201


@app.route('/login', methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"message": "Email and password are required"}), 400

        user = Users.query.filter_by(email=email).first()

        if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password):
            return jsonify({"message": "Invalid credentials"}), 401

        # Successful login logic here
        return jsonify({"message": "Login successful"}), 200
    except BadRequest as e:
        return jsonify({"message": str(e)}), 400
    except Exception as e:
        app.logger.error(f"Error during login: {e}")
        return jsonify({"message": "An error occurred during login"}), 500


@app.route('/accounts', methods=["GET"])
def created_accounts():
    users = Users.query.all()
    json_accounts = []
    for user in users:
        json_accounts.append(user.to_json())
    return jsonify({"accounts": json_accounts})


@app.route('/delete_user/<int:user_id>', methods=["DELETE"])
def delete_user(user_id):
    try:
        user = Users.query.get(user_id)

        if not user:
            return jsonify({"message": "User account not found"}), 404

        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User account has been deleted"})
    except Exception as e:
        # Handle specific exceptions here
        return jsonify({"message": "An error occurred during deletion"}), 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
