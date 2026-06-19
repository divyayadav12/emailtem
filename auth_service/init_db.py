import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def init_db():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    create_tables_query = """
    CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role_id INTEGER REFERENCES roles(id),
        failed_login_attempts INTEGER DEFAULT 0,
        account_locked BOOLEAN DEFAULT FALSE,
        last_login TIMESTAMP,
        email_verified BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS email_verifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        verification_token VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        action VARCHAR(100) NOT NULL,
        entity_type VARCHAR(100),
        entity_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS mfa_otps (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        otp VARCHAR(10) NOT NULL,
        expires_at TIMESTAMP NOT NULL
    );

    CREATE TABLE IF NOT EXISTS auth_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        token VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS password_resets (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        reset_token VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE
    );

    INSERT INTO roles (name) VALUES ('ADMIN'), ('MANAGER'), ('EMPLOYEE') ON CONFLICT DO NOTHING;
    """

    try:
        cur.execute(create_tables_query)
        conn.commit()
        print("Database initialized successfully.")
    except Exception as e:
        conn.rollback()
        print("Error initializing database:", e)
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    init_db()
