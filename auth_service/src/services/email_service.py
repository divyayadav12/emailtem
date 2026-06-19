
import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from core.config import (
    SMTP_HOST,
    SMTP_PORT,
    SMTP_EMAIL,
    SMTP_PASSWORD
)


def send_otp_email(
    recipient_email: str,
    otp: str
):

    try:

        message = MIMEMultipart()

        message["From"] = SMTP_EMAIL
        message["To"] = recipient_email
        message["Subject"] = "Enterprise Email Platform - MFA OTP"

        body = f"""
Hello,

Your One-Time Password (OTP) is:

{otp}

This OTP is valid for 5 minutes.

If you did not request this login, please ignore this email.

Regards,
Enterprise Email Platform Security Team
"""

        message.attach(
            MIMEText(
                body,
                "plain"
            )
        )

        server = smtplib.SMTP(
            SMTP_HOST,
            SMTP_PORT
        )

        server.starttls()

        server.login(
            SMTP_EMAIL,
            SMTP_PASSWORD
        )

        server.sendmail(
            SMTP_EMAIL,
            recipient_email,
            message.as_string()
        )

        server.quit()

        return True

    except Exception as e:

        print(
            f"OTP Email Error: {str(e)}"
        )

        return False
