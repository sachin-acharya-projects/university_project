console.log("Audio Player Loaded")

// const $_ = (identifier) => document.querySelector(identifier)

let count = 1

!function fetch_media() {
    const genre_lst = ["discover", "oldnepali","oldsongs", "nepali_songs", "maithali_song","purelok_song","best_dohori_song","yuvraaj_song","tharu_song","lok_dohori_song","apan_mithila_song","jhijhiya_song","cultural_song","Latest_song","rap_song","maithili_rap_song","swapnil_song","maithili_cultural"]

    for(const genre of genre_lst) {
        fetch('/get_media', {
            method: "POST", 
            body: JSON.stringify({
                genre
            })
        })
        .then(data => data.json())
        .then(data => {
            console.log(data.videos.length)

            for (const videoData of data.videos) {
                const video_id = videoData['id']
                const thumnail = videoData['thumbnails']
                const vtitle = videoData['title']
                const vchannel = videoData['channel']

                const contentsCode = `
                    <div class="items" data-vid='${video_id}' onclick="loadMedia(this, '${videoData['link']}')" data-id="${count}">
                    <img src="${thumnail[3].url}" alt="" loading='lazy'>
                    <br>
                   <div class="introductions">
                        <h3>${vtitle}</h3>
                        <p class="channel">
                            ${vchannel.name}
                        </p>
                    </div>
                    </div>
                `
                count++
                $_(`.${genre} .contents`).innerHTML += contentsCode
            }

            document.body.setAttribute("data-total", count)
        })
    }
}()