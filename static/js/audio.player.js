const $ = (identifier) => document.querySelector(identifier)

!function fetch_media() {
    const genre_lst = ["discover", "oldsongs"]

    for(const genre of genre_lst) {
        fetch('/get_media', {
            method: "POST", 
            body: JSON.stringify({
                genre
            })
        })
        .then(data => data.json())
        .then(data => {
            console.log(data)

            for (const videoData of data.videos) {
                const video_id = videoData['id']
                const thumnail = videoData['thumbnails']
                const vtitle = videoData['title']
                const vchannel = videoData['channel']

                const contentsCode = `
                    <div class="items" data-vid='${video_id}' onclick="loadMedia('${videoData['link']}')">
                    <img src="${thumnail[3].url}" alt="" loading='lazy'>
                    <br>
                   <h3>${vtitle}</h3>
                    <div class="introductions">
                        <p class="channel">
                            ${vchannel.name}
                        </p>
                    </div>
                    </div>
                `

                $(`.${genre} .contents`).innerHTML += contentsCode
            }
        })
    }
}()

let audio = new Audio()

const loadMedia = (media_link) => {
    fetch("/play_media", {
        method: "POST", 
        body: JSON.stringify({
            videoLink: media_link
        })
    })
    .then(data => data.json())
    .then(data => {
        
    })
}