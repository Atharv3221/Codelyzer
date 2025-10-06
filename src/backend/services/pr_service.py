from ..utils. import hello


def get_greeting():
    """Return greeting without executing at import time."""
    return hello()
