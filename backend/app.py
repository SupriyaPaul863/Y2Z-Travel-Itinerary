from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for local development

@app.route('/get-map', methods=['POST'])
def get_map():
    data = request.get_json()
    place_name = data.get("place")

    if not place_name:
        return jsonify({"error": "No place provided"}), 400

    # Simple Google Maps embed URL (no API key needed for basic query)
    embed_url = f"https://www.google.com/maps?q={place_name}&output=embed"

    return jsonify({"map_url": embed_url})

if __name__ == '__main__':
    app.run(debug=True)
