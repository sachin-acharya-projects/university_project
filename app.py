from flask import Flask, url_for, render_template, request, jsonify
from youtubesearchpython import Playlist, ResultMode, Video, StreamURLFetcher
import json
from colorama import init, Fore; init(autoreset=True)
# import asyncio


url_fetcher = StreamURLFetcher()

app = Flask(
    __name__,
    static_url_path="",
    static_folder="static"
)
app.config['JSON_SORT_KEYS'] = False

def printx(value):
    print(f"{Fore.LIGHTCYAN_EX}{value}")

# Get genre list

temp_genre = {}
with open("media_list.json", "r") as file:
    temp_genre = json.load(file)

def record_object(data):
    with open("data.json", "w") as file:
        file.seek(0)
        file.truncate()

        json.dump(data, file, indent=4)

@app.route("/get_cat", methods=["GET"])
def get_cat():
    return temp_genre

@app.route("/get_media", methods=['POST'])
def get_media():
    genre_text = request.get_json(force=True)['genre']
    playlist_url = temp_genre[genre_text]
    playlists = Playlist.getVideos(playlist_url['url'], mode=ResultMode.json)
    return playlists

@app.route("/playable_media", methods=['POST'])
def playMedia():
    video = Video.get(request.get_json(force=True)['media_link'])
    videoData = url_fetcher.get(video, 139)
    # record_object(videoData)
    return jsonify({
        "playable_link": videoData
    })

@app.route("/")
def main():
    return render_template('index.html')
if __name__ == "__main__":
    app.run(debug=True)