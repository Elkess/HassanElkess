import tempfile
import unittest
from pathlib import Path

import app


class AppStorageTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp_dir = tempfile.TemporaryDirectory()
        self.original_data_file = app.DATA_FILE
        app.DATA_FILE = Path(self.temp_dir.name) / "artworks.json"

    def tearDown(self) -> None:
        app.DATA_FILE = self.original_data_file
        self.temp_dir.cleanup()

    def test_add_artwork_persists_and_returns_latest_first(self) -> None:
        first = app.add_artwork("Sunset", "https://example.com/sunset.jpg", "warm")
        second = app.add_artwork("Ocean", "https://example.com/ocean.jpg", "cool")

        self.assertEqual("1", first["id"])
        self.assertEqual("2", second["id"])

        stored = app.load_artworks()
        self.assertEqual("Ocean", stored[0]["title"])
        self.assertEqual("Sunset", stored[1]["title"])

    def test_is_valid_image_url_allows_only_http_and_https(self) -> None:
        self.assertTrue(app.is_valid_image_url("https://example.com/image.jpg"))
        self.assertTrue(app.is_valid_image_url("http://example.com/image.jpg"))
        self.assertFalse(app.is_valid_image_url("javascript:alert(1)"))
        self.assertFalse(app.is_valid_image_url("file:///tmp/image.jpg"))
        self.assertFalse(app.is_valid_image_url("example.com/image.jpg"))


if __name__ == "__main__":
    unittest.main()
