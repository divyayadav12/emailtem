import urllib.request
import json
import jwt
from datetime import datetime, timedelta

SECRET_KEY = "zenvora_enterprise_email_2026_super_secret_key"
ALGORITHM = "HS256"

expire = datetime.utcnow() + timedelta(minutes=30)
payload = {
    "user_id": 1,
    "email": "admin@enterprise.com",
    "role": "ADMIN",
    "exp": expire
}

token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

data = {
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "EMPLOYEE"
}

req = urllib.request.Request("http://127.0.0.1:8000/auth/register", data=json.dumps(data).encode(), headers=headers)
try:
    with urllib.request.urlopen(req) as res:
        print("Status:", res.status)
        print("Response:", res.read().decode())
except urllib.error.HTTPError as e:
    print("Status:", e.code)
    print("Response:", e.read().decode())
