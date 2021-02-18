const request = require('postman-request')

const geocode = (address = process.argv[2], callback) =>{ 
    
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiY2FybGlyb3dzIiwiYSI6ImNrbDhkMHprczIxcHUydmxjOGV5bmQwM3kifQ.rQzKgN6QUxbclWRdfAMtew&limit=1'

   request({ url, json: true }, (error, {body}) => {
       if(error) {
           callback('Unable to connect to geoLocation service')
       } else if (body.features.length === 0) {
           callback('Unable to find location. Try another search')
       } else {
           callback(undefined, {
               latitude: body.features[0].center[0],
               longitude: body.features[0].center[1],
               location: body.features[0].place_name
           })
       }
   })
}

module.exports = geocode