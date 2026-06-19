import secrets

from database import conn, cursor


def add_domain(domain_name):

    if "@" in domain_name:
        return {
            "error": "Please enter a domain only"
        }

    cursor.execute(
        "SELECT * FROM domains WHERE domain_name=%s",
        (domain_name,)
    )

    existing = cursor.fetchone()

    if existing:
        return {
            "error": "Domain already exists"
        }

    verification_token = secrets.token_hex(16)

    cursor.execute(
        """
        INSERT INTO domains
        (domain_name, verification_token, status)
        VALUES (%s, %s, %s)
        RETURNING id
        """,
        (
            domain_name,
            verification_token,
            "PENDING"
        )
    )

    domain_id = cursor.fetchone()[0]

    conn.commit()

    return {
        "id": domain_id,
        "domain_name": domain_name,
        "verification_token": verification_token,
        "status": "PENDING"
    }


def get_domains():

    cursor.execute(
        """
        SELECT id,
               domain_name,
               verification_token,
               status
        FROM domains
        """
    )

    rows = cursor.fetchall()

    result = []

    for row in rows:

        result.append(
            {
                "id": row[0],
                "domain_name": row[1],
                "verification_token": row[2],
                "status": row[3]
            }
        )

    return result


def verify_domain(domain_id):

    cursor.execute(
        """
        SELECT id,
               domain_name,
               status
        FROM domains
        WHERE id=%s
        """,
        (domain_id,)
    )

    domain = cursor.fetchone()

    if not domain:
        return None

    cursor.execute(
        """
        UPDATE domains
        SET status='VERIFIED'
        WHERE id=%s
        """,
        (domain_id,)
    )

    conn.commit()

    return {
        "id": domain[0],
        "domain_name": domain[1],
        "status": "VERIFIED"
    }


def get_domain_status(domain_id):

    cursor.execute(
        """
        SELECT domain_name,
               status
        FROM domains
        WHERE id=%s
        """,
        (domain_id,)
    )

    domain = cursor.fetchone()

    if not domain:
        return None

    return {
        "domain_name": domain[0],
        "status": domain[1]
    }