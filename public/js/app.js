console.log('connected');

const weatherForm  =document.querySelector('form')
const search = document.querySelector('input')
const messangeOne = document.querySelector('#message-1')
const messangeTwo = document.querySelector('#location-1')


weatherForm.addEventListener('submit',(e)=>{
e.preventDefault()
   const location = search.value
   fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        const {temperature,humidity}=data.data
        messangeOne.textContent="Temperature "+temperature+"° and Humidity "+humidity+"°"
        messangeTwo.textContent=data.location
        console.log(data.data.error)
    })
    })
})