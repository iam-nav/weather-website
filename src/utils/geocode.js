const request = require('request')

const geocode =(address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoiaWFtbmF2IiwiYSI6ImNrOWJhYjZlZjBtaHozbnMybmgyMTZkYmcifQ.d-BSNdaomSkFKgYgh7llYg&limit=0'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to server',undefined)
        }else if(response.body.features.length ===0){
            callback('please enter a correct input',undefined)
        }else {
            const data={
                longitude:response.body.features[0].center[0],
                latitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}
module.exports={
    geocode:geocode
}