import requests
from datetime import datetime, timedelta


def fetch_donki_events(days=7, api_key="DEMO_KEY"):
    """Fetch recent solar events from NASA DONKI API."""
    end_date = datetime.utcnow().date()
    start_date = end_date - timedelta(days=days)
    url = (
        "https://api.nasa.gov/DONKI/notifications"
        f"?startDate={start_date}&endDate={end_date}&type=all&api_key={api_key}"
    )
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return response.json()


def main():
    try:
        events = fetch_donki_events()
    except Exception as exc:
        print(f"Failed to fetch data: {exc}")
        return

    if not events:
        print("No recent solar events found.")
        return

    print("Recent NASA DONKI Solar Events:\n")
    for event in events:
        message_type = event.get("messageType", "Unknown")
        message = event.get("messageBody", "No details")
        print(f"- {message_type}: {message[:100]}...")


if __name__ == "__main__":
    main()
