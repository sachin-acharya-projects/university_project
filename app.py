from flask import Flask, url_for, render_template, request, jsonify
from youtubesearchpython import Playlist, ResultMode, Video, StreamURLFetcher
import json
from colorama import init, Fore; init(autoreset=True)
# import asyncio


url_fetcher = StreamURLFetcher()
temp_genre = {
    "oldsongs": "https://www.youtube.com/playlist?list=PLIwuzph_6PZRg4XGLH0dl3aGNMDuQeogL",
    "discover": "https://www.youtube.com/playlist?list=PLIwuzph_6PZR9SUJyDrOXzufQHIM72rR8",
    "nepali_songs": "https://youtube.com/playlist?list=PLYv2ssKShZqmbpXSfkNLYOt8hYTmspDeT",
    "maithali_song": "https://youtube.com/playlist?list=PLYv2ssKShZqlXySnqA71JURdIAuVlGjVR",
    "purelok_song":"https://youtube.com/playlist?list=PLhFjSCJkUOMh2cuvM7dqBDiGs9XLCfmRq",
    "best_dohori_song":"https://youtube.com/playlist?list=PLEabDaxwSYPB1ZOCML0Xat-VEslf8iV8K",
    "yuvraaj_song":"https://youtube.com/playlist?list=PLhtYJigHJ5J_EtNu00Cs-nUgXrshDpBVU",
    "tharu_song": "https://youtube.com/playlist?list=PLYv2ssKShZqnrGM52QXhQL6t5wv9Oo2h9",
    "lok_dohori_song": "https://youtube.com/playlist?list=PLPGkwzfmb-J-xLhU8nHJ_HYmnevqoM3bS",
    "apan_mithila_song": "https://youtube.com/playlist?list=PLYv2ssKShZql_LekhKtYW3UBapidqjriu",
    "oldnepali":"https://youtube.com/playlist?list=PLYv2ssKShZqmjDn-x-ELsQSu3ovYiZiV2",
    "maithili_cultural": "https://youtube.com/playlist?list=PLYv2ssKShZqkTv-vT0s4UnkoHMm95PFyw",
    "jhijhiya_song": "https://youtube.com/playlist?list=PLYv2ssKShZqlUUMZn2sBHgzvHj-YvcqpZ",
    "cultural_song":"https://youtube.com/playlist?list=PLYv2ssKShZqmOn4kiM5a_-WFS67buuvLh",
    "Latest_song":"https://youtube.com/playlist?list=PLYv2ssKShZqlEx_u-7UqBoLJkG9GA1jOt",
    "rap_song":"https://youtube.com/playlist?list=PLYv2ssKShZqlpVsqQDft4V_fRoO5EqI-s",
    "maithili_rap_song":"https://youtube.com/playlist?list=PLYv2ssKShZqmpKMG15zTd6mfRuEZvlsYI",
    "swapnil_song":"https://youtube.com/playlist?list=PLYv2ssKShZqlO1bBESK24nqI6l6gX6-cU"
}

app = Flask(
    __name__,
    static_url_path="",
    static_folder="static"
)

def printx(value):
    print(f"{Fore.LIGHTCYAN_EX}{value}")

def record_object(data):
    with open("data.json", "w") as file:
        file.seek(0)
        file.truncate()

        json.dump(data, file, indent=4)

@app.route("/get_media", methods=['POST'])
def get_media():
    playlist_url = temp_genre[request.get_json(force=True)['genre']]
    playlists = Playlist.getVideos(playlist_url, mode=ResultMode.json)
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