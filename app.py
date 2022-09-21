from crypt import methods
from flask import Flask, url_for, render_template, request, jsonify
from youtubesearchpython import Playlist, ResultMode
# import asyncio

temp_genre = {
    "discover": "https://www.youtube.com/playlist?list=PLIwuzph_6PZRg4XGLH0dl3aGNMDuQeogL",
    "oldsongs": "https://www.youtube.com/playlist?list=PLIwuzph_6PZR9SUJyDrOXzufQHIM72rR8"
}

app = Flask(
    __name__,
    static_url_path="",
    static_folder="static"
)

@app.route("/get_media", methods=['POST'])
def get_media():
    playlist_url = temp_genre[request.get_json(force=True)['genre']]
    playlists = Playlist.getVideos(playlist_url, mode=ResultMode.json)
    return playlists

@app.route("/play_media", methods=['POST'])
def playMedia(url):
    mediaUrl = request.get_json(force=True)['videoLink']
    

@app.route("/")
def main():
    return render_template('index.html')
if __name__ == "__main__":
    app.run(debug=True)