"""Отправка сообщения из формы обратной связи на email."""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        email = body.get("email", "").strip()
        message = body.get("message", "").strip()

        if not name or not email or not message:
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": {"error": "Заполните все поля"},
            }

        contact_email = os.environ.get("CONTACT_EMAIL", "")
        smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.environ.get("SMTP_PORT", "587"))
        smtp_user = os.environ.get("SMTP_USER", "")
        smtp_pass = os.environ.get("SMTP_PASS", "")

        if contact_email and smtp_user and smtp_pass:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"Новое сообщение с сайта БезОпасно от {name}"
            msg["From"] = smtp_user
            msg["To"] = contact_email

            html_body = f"""
            <html><body style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #5a7a6e;">Новое сообщение с сайта БезОпасно</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding: 8px; font-weight: bold;">Имя:</td><td style="padding: 8px;">{name}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:{email}">{email}</a></td></tr>
              <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Сообщение:</td>
                  <td style="padding: 8px; white-space: pre-wrap;">{message}</td></tr>
            </table>
            </body></html>
            """

            msg.attach(MIMEText(html_body, "html"))

            with smtplib.SMTP(smtp_host, smtp_port) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, contact_email, msg.as_string())

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": {"success": True, "message": "Сообщение отправлено"},
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": {"error": str(e)},
        }
