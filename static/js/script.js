console.log("Main Script Loaded")
const $_ = (identifier) => document.querySelector(identifier)

const closeSideBar = $_('.closeSideBar')
const sideBar = $_('.sideBar')

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

const tempMessage = $_(".timeoutmessage")
$_('.timeoutClose').addEventListener('click', ()=>{
    tempMessage.style.display = 'none'
})
setTimeout(()=>{
    tempMessage.style.display = 'none'
}, 5000)

$_('.search_bar').addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
        e.preventDefault()
        document.querySelector('.searchBtn').click()
    }
})