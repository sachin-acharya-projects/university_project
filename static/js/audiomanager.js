console.log("Audio Manager Loaded")

// let $_ = (identifier) => document.querySelector(identifier)

// DOM Selections
const previousBtn = $_(".arrow_back")
const playpauseBtn = $_(".playPauseMedia")
const nextBtn = $_(".arrow_forward")
const expandBtn = $_(".expand")

const mediaThumbnail = $_(".master-player .thumbnail img")
const mediaTitle = $_(".master-player .music-info .mtitle")
const mediaChannel = $_(".master-player .music-info .aname")

let currentCount = 1
const audioPlayer = new Audio()

// Loading Frirst Audio in the our list
!function preload() {

}()

function stop_audio () {
    audioPlayer.pause()
    audioPlayer.currentTime = 0
}

function loadMedia(domel, media_link) {
    let isPaused = audioPlayer.paused
    stop_audio()
    fetch("/playable_media", {
        method: "POST",
        body: JSON.stringify({
            media_link
        })
    })
    .then(data => data.json())
    .then(data => {
        // console.log(domel)
        const playable_link = data['playable_link']
        audioPlayer.src = playable_link
        mediaThumbnail.src = domel.querySelector("img").src
        mediaTitle.textContent = domel.querySelector("h3").textContent
        mediaTitle.textContent = domel.querySelector("h3").textContent
        mediaChannel.textContent = domel.querySelector(".channel").textContent
        if (!isPaused) {
            audioPlayer.play()
        }
    })
}

audioPlayer.addEventListener("playing", () => {
    playpauseBtn.textContent = "pause"
})

audioPlayer.addEventListener("pause", () => {
    playpauseBtn.textContent = "play_arrow"
})

audioPlayer.addEventListener("change", () => {
    let isPaused = audioPlayer.paused
    audioPlayer.pause()
    audioPlayer.currentTime = 0

    if (!isPaused) {
        audioPlayer.play()
    }
})

audioPlayer.addEventListener("ended", playNext)

function playPausemethod() {
    if(audioPlayer.paused) {
        audioPlayer.play()
    }else {
        audioPlayer.pause()
    }
}

function playNext() {
    const totalCount = document.body.getAttribute("data-total")
    currentCount = (currentCount >= totalCount) ? 1 : currentCount + 1
    nextElement = document.querySelector(`[data-id='${currentCount}']`)
    loadMedia(nextElement, "https://www.youtube.com/watch?v=" + nextElement.getAttribute("data-vid"))
    console.log(nextElement)
}

function playPrevious() {
    const totalCount = document.body.getAttribute("data-total")
    currentCount = (currentCount === 1) ? totalCount : currentCount - 1
    nextElement = document.querySelector(`[data-id='${currentCount}']`)
    loadMedia(nextElement, "https://www.youtube.com/watch?v=" + nextElement.getAttribute("data-vid"))
}