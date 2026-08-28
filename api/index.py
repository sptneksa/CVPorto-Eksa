import json
import os
import bcrypt
import jwt
import requests
from datetime import datetime, timedelta, timezone
from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

SECRET_KEY = os.environ.get('JWT_SECRET', 'super-secret-key-change-this-in-production')
KV_REST_API_URL = os.environ.get('KV_REST_API_URL')
KV_REST_API_TOKEN = os.environ.get('KV_REST_API_TOKEN')
KV_KEY = 'eksa_portfolio_data'

# Generate hash for the default password "eksa2026"
ADMIN_PASSWORD_HASH = bcrypt.hashpw(b'eksa2026', bcrypt.gensalt())

def authenticate(token):
    if not token:
        return False
    try:
        jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return True
    except:
        return False

def get_kv_data():
    if not KV_REST_API_URL or not KV_REST_API_TOKEN:
        return {'siteData': {}, 'portfolioData': [], 'docsData': []}
    
    headers = {'Authorization': f'Bearer {KV_REST_API_TOKEN}'}
    try:
        res = requests.get(f"{KV_REST_API_URL}/get/{KV_KEY}", headers=headers)
        if res.ok and res.json().get('result'):
            return json.loads(res.json()['result'])
        return {'siteData': {}, 'portfolioData': [], 'docsData': []}
    except Exception as e:
        print("KV Get Error:", e)
        return {'siteData': {}, 'portfolioData': [], 'docsData': []}

def set_kv_data(data):
    if not KV_REST_API_URL or not KV_REST_API_TOKEN:
        raise Exception("Vercel KV credentials missing")
    
    headers = {
        'Authorization': f'Bearer {KV_REST_API_TOKEN}',
        'Content-Type': 'application/json'
    }
    try:
        # Vercel KV REST requires the body to be the value to set, as a string
        res = requests.post(f"{KV_REST_API_URL}/set/{KV_KEY}", headers=headers, data=json.dumps(data))
        if not res.ok:
            raise Exception(res.text)
    except Exception as e:
        print("KV Set Error:", e)
        raise e

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    if not data or 'password' not in data:
        return jsonify({'error': 'Password is required'}), 400
    
    password = data['password'].encode('utf-8')
    if bcrypt.checkpw(password, ADMIN_PASSWORD_HASH):
        token = jwt.encode({'admin': True, 'exp': datetime.now(timezone.utc) + timedelta(days=1)}, SECRET_KEY, algorithm='HS256')
        resp = make_response(jsonify({'success': True, 'message': 'Logged in successfully'}))
        resp.set_cookie('token', token, httponly=True, samesite='Lax')
        return resp
    return jsonify({'error': 'Invalid password'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    resp = make_response(jsonify({'success': True, 'message': 'Logged out successfully'}))
    resp.set_cookie('token', '', expires=0)
    return resp

@app.route('/api/session', methods=['GET'])
def session():
    token = request.cookies.get('token')
    if authenticate(token):
        return jsonify({'loggedIn': True})
    return jsonify({'loggedIn': False})

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        data = get_kv_data()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': 'Failed to read database'}), 500

@app.route('/api/data', methods=['POST'])
def save_data():
    token = request.cookies.get('token')
    if not authenticate(token):
        return jsonify({'error': 'Unauthorized'}), 401
    
    try:
        set_kv_data(request.json)
        return jsonify({'success': True, 'message': 'Data saved successfully'})
    except Exception as e:
        return jsonify({'error': 'Failed to save database'}), 500
