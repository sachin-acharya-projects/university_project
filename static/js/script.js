const closeBtn = document.querySelector('.closeSideBar')
const sideBar = document.querySelector('.sideBar')

closeBtn.addEventListener('click', () => {
    if(closeBtn.classList.contains('open')){
        sideBar.classList.remove('open')
        sideBar.classList.add('close')
        
        closeBtn.classList.remove('open')
        closeBtn.classList.add('close')
    }else{
        sideBar.classList.remove('close')
        sideBar.classList.add('open')

        closeBtn.classList.remove('close')
        closeBtn.classList.add('open')
    }
})

const tempMessage = document.querySelector(".timeoutmessage")
document.querySelector('.timeoutClose').addEventListener('click', ()=>{
    tempMessage.style.display = 'none'
})
setTimeout(()=>{
    tempMessage.style.display = 'none'
}, 5000)

document.querySelector('.search_bar').addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
        e.preventDefault()
        document.querySelector('.searchBtn').click()
    }
})

for(let i = 0; i < 4; i++){
    const contentsCode = `
        <div class="items item-${i}">
        <img src="/assets/Image-${i%2 == 0 ? 1 : 2}.jpg" alt="" loading='lazy'>
        <br>
        <div class="ratings"><span class="material-icons">visibility</span><span class="views">12M</span></div>
        <h3>Battle Symphony | Linkin Park feat. One Direction (Cover by Beyonce Aveneu)</h3>
        <div class="introductions">
            <p class="channel">
                One Direction and Linkin Park
            </p>
            <p class="date">
                2022/12/11
            </p>
        </div>
        </div>
    `
    document.querySelector('.discover .contents').innerHTML += contentsCode
    document.querySelector('.suggestions .contents').innerHTML += contentsCode
}