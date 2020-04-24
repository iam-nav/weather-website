const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT || 3000

const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

//define path for express config
const publicDirectory= path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialPath =path.join(__dirname,'../templates/partials')

//setup handlebar engine and location
app.set('view engine', 'hbs');
app.set('views',viewpath)

//setup static directory to serve
app.use(express.static(publicDirectory))
hbs.registerPartials(partialPath)

app.get('', (req,res)=>{
    res.render('index',{
        title:'weather',
        name:'Navjot Singh'
    })
})
app.get('/about',(req,res)=>{
    res.render('profile',{
        title:'About',
        name:'Navjot Singh'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        helpText:"Help",
        title:"Help"
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
      return  res.send('you must provide an address')
    }else{
        const address={
          name:req.query.address
        }
        const {name}=address

        geocode.geocode(name,(error,data={})=>{
            if(error){
               return res.send({error})
            }
        const {longitude, latitude}=data
        const weather = [latitude,longitude]
        const location =data.location
        forcast.forcast(weather,(error,data)=>{
            if(error){
              return res.send({error})
            }
            res.send({
                data,
                location
            })
           })
        }) 
    }
})



app.get('/help/*',(req,res)=>{
    res.send('Your help data does not found')
    })
    

app.get('*',(req,res)=>{
res.render('404page')
})

app.listen(port,()=>{
    console.log('server is up on'+port)
})
