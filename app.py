import json
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data" / "artworks.json"
INDEX_FILE = BASE_DIR / "static" / "index.html"


def ensure_data_file() -> None:
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    if not DATA_FILE.exists():
        DATA_FILE.write_text("[]", encoding="utf-8")


def load_artworks() -> list[dict[str, str]]:
    ensure_data_file()
    with DATA_FILE.open("r", encoding="utf-8") as file:
        data = json.load(file)
    if isinstance(data, list):
        return data
    return []


def save_artworks(artworks: list[dict[str, str]]) -> None:
    ensure_data_file()
    with DATA_FILE.open("w", encoding="utf-8") as file:
        json.dump(artworks, file, indent=2)


def next_artwork_id(artworks: list[dict[str, str]]) -> str:
    max_id = 0
    for artwork in artworks:
        raw_id = str(artwork.get("id", "")).strip()
        if raw_id.isdigit():
            max_id = max(max_id, int(raw_id))
    return str(max_id + 1)


def add_artwork(title: str, image_url: str, description: str) -> dict[str, str]:
    artworks = load_artworks()
    artwork = {
        "id": next_artwork_id(artworks),
        "title": title.strip(),
        "imageUrl": image_url.strip(),
        "description": description.strip(),
    }
    artworks.insert(0, artwork)
    save_artworks(artworks)
    return artwork


def is_valid_image_url(image_url: str) -> bool:
    try:
        parsed = urlparse(image_url)
    except ValueError:
        return False
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


class ArtistPortfolioHandler(BaseHTTPRequestHandler):
    def _send_json(self, payload: dict | list, status: int = HTTPStatus.OK) -> None:
        data = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _send_file(self, path: Path, content_type: str) -> None:
        if not path.exists():
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        body = path.read_bytes()
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/":
            self._send_file(INDEX_FILE, "text/html; charset=utf-8")
            return
        if parsed.path == "/api/artworks":
            self._send_json(load_artworks())
            return
        self.send_error(HTTPStatus.NOT_FOUND)

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path != "/api/artworks":
            self.send_error(HTTPStatus.NOT_FOUND)
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(content_length)

        try:
            payload = json.loads(raw_body or b"{}")
        except json.JSONDecodeError:
            self._send_json({"error": "Invalid JSON body."}, HTTPStatus.BAD_REQUEST)
            return

        title = str(payload.get("title", "")).strip()
        image_url = str(payload.get("imageUrl", "")).strip()
        description = str(payload.get("description", "")).strip()

        if not title or not image_url:
            self._send_json(
                {"error": "Fields 'title' and 'imageUrl' are required."},
                HTTPStatus.BAD_REQUEST,
            )
            return
        if not is_valid_image_url(image_url):
            self._send_json(
                {"error": "Field 'imageUrl' must be a valid http/https URL."},
                HTTPStatus.BAD_REQUEST,
            )
            return

        artwork = add_artwork(title, image_url, description)
        self._send_json(artwork, HTTPStatus.CREATED)


def run() -> None:
    ensure_data_file()
    server = ThreadingHTTPServer(("127.0.0.1", 8000), ArtistPortfolioHandler)
    print("Artist portfolio running on http://localhost:8000")
    server.serve_forever()


if __name__ == "__main__":
    run()
