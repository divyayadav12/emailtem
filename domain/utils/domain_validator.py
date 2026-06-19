import re
import socket
import dns.resolver


def validate_domain_format(domain):

    pattern = r"^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

    return bool(
        re.match(pattern, domain)
    )


def check_dns(domain):

    try:
        socket.gethostbyname(domain)
        return True

    except:
        return False


def check_mx(domain):

    try:
        dns.resolver.resolve(
            domain,
            "MX"
        )

        return True

    except:
        return False