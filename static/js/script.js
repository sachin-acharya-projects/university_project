const $ = (identifier) => document.querySelector(identifier)

const closeSideBar = $('.closeSideBar')
const sideBar = $('.sideBar')

closeSideBar.addEventListener('click', () => {
    if(closeSideBar.classList.contains('open')){
        sideBar.classList.remove('open')
        sideBar.classList.add('close')
        
        closeSideBar.classList.remove('open')
        closeSideBar.classList.add('close')
    }else{
        sideBar.classList.remove('close')
        sideBar.classList.add('open')

        closeSideBar.classList.remove('close')
        closeSideBar.classList.add('open')
    }
})

const tempMessage = $(".timeoutmessage")
$('.timeoutClose').addEventListener('click', ()=>{
    tempMessage.style.display = 'none'
})
setTimeout(()=>{
    tempMessage.style.display = 'none'
}, 5000)

$('.search_bar').addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
        e.preventDefault()
        document.querySelector('.searchBtn').click()
    }
})

// for(let i = 0; i < 4; i++){
//     const contentsCode = `
//         <div class="items item-${i}">
//         <img src="/assets/Image-${i%2 == 0 ? 1 : 2}.jpg" alt="" loading='lazy'>
//         <br>
//         <div class="ratings"><span class="material-icons">visibility</span><span class="views">12M</span></div>
//         <h3>Battle Symphony | Linkin Park feat. One Direction (Cover by Beyonce Aveneu)</h3>
//         <div class="introductions">
//             <p class="channel">
//                 One Direction and Linkin Park
//             </p>
//             <p class="date">
//                 2022/12/11
//             </p>
//         </div>
//         </div>
//     `
//     $('.discover .contents').innerHTML += contentsCode
//     $('.suggestions .contents').innerHTML += contentsCode
// }