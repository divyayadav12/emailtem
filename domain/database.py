import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

conn = psycopg2.connect(DATABASE_URL)
# Ensure autocommit is on so that failed transactions don't block subsequent ones if we are sharing the connection.
conn.autocommit = True

cursor = conn.cursor()

# Initialize domains table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS domains (
        id SERIAL PRIMARY KEY,
        domain_name VARCHAR(255) UNIQUE NOT NULL,
        verification_token VARCHAR(255),
        status VARCHAR(50) DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
""")

print("Database Connected Successfully and Tables Initialized")