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

!function () {
    fetch("/get_cat", {
        method: "GET"
    })
    .then(data => data.json())
    .then(data => {
        let count = parseInt(data['length'])
        delete data['length']
        let keys = Object.keys(data)

        let string_data = ""
        for (let i = 0; i < count; i++) {
            key = keys[i]
            string_data += `
                    <div class="${key}">
                        <div class="heading">
                            <p>${data[key].name}</p>
                            <span class="pov">${data[key].description}</span>
                        </div>
                        <div class="contents">
                            <!--
                            Content will be loaded programatically
                            -->
                        </div>
                        <div class="viewAll">
                            View All
                        </div>
                    </div>
                `
            }
            
        string_data += `<div class="sep"></div>`

        $_(".contentPart").innerHTML = string_data
    })
}()