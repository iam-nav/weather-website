const request = require('request')

const forcast = (coOrdinates,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=1c63095ee97614226ba3b023e8a93e26&query='+coOrdinates
      request({url: url,json:true},(error,response)=>{
       if(error){
           callback('Unable to connect to weather server',undefined)
       }else if(response.body.error){
           callback('Unable to find location',undefined)
       }else{
           const data={
               temperature:response.body.current.temperature,
               humidity:response.body.current.humidity
           }
           callback(undefined,data)
       }
   }
      )}
   


module.exports={
    forcast:forcast
}