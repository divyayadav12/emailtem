import psycopg2
import bcrypt
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

demo_users = [
    {"name": "Admin", "email": "admin@enterprise.com", "password": "admin123", "role": "ADMIN"},
    {"name": "Manager", "email": "manager@enterprise.com", "password": "manager123", "role": "MANAGER"},
    {"name": "Employee", "email": "employee@enterprise.com", "password": "employee123", "role": "EMPLOYEE"},
]

def seed_users():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    try:
        # Unlock any locked accounts
        cur.execute("UPDATE users SET account_locked = FALSE, failed_login_attempts = 0;")
        
        for u in demo_users:
            # Check if user exists
            cur.execute("SELECT id FROM users WHERE email = %s", (u["email"],))
            if not cur.fetchone():
                cur.execute("SELECT id FROM roles WHERE name = %s", (u["role"],))
                role_record = cur.fetchone()
                if not role_record:
                    print(f"Role {u['role']} not found!")
                    continue
                role_id = role_record[0]
                
                hashed_password = bcrypt.hashpw(u["password"].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
                
                cur.execute(
                    "INSERT INTO users (name, email, password_hash, role_id, email_verified) VALUES (%s, %s, %s, %s, TRUE)",
                    (u["name"], u["email"], hashed_password, role_id)
                )
            else:
                # Update password for existing demo users just in case
                hashed_password = bcrypt.hashpw(u["password"].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
                cur.execute(
                    "UPDATE users SET password_hash = %s WHERE email = %s",
                    (hashed_password, u["email"])
                )
        
        conn.commit()
        print("Demo users seeded and accounts unlocked.")
    except Exception as e:
        conn.rollback()
        print("Error:", e)
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    seed_users()
