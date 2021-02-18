const request = require('postman-request')

const forecast = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=6be37cbfaa92ca851304b77365bbb048&query='+ lon + ',' + lat + '&units=m'

    request({ url, json: true }, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                forecast: body.current.weather_descriptions[0],
                current: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast