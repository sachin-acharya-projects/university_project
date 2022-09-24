console.log("Audio Player Loaded")

// const $_ = (identifier) => document.querySelector(identifier)

let count = 0

!function fetch_media() {
    fetch("/get_cat", {
        method: "GET"
    })
    .then(genre_list => genre_list.json())
    .then(genre_list => {
        delete genre_list['length']
        let genre_lst = Object.keys(genre_list)
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
                    <div class="items playables" data-vid='${video_id}' onclick="loadMedia(this, '${videoData['link']}')" data-id="${count}">
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
                    // console.log("C ", count)
                    $_(`.${genre} .contents`).innerHTML += contentsCode
                }
    
                document.body.setAttribute("data-total", count)
            })
        }
    })
}()