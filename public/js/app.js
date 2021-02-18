console.log('Client side js file loaded!')
//fetch es una api del browser, no la puedo usar en node, solo cuando hago desarrollo para el lado del cliente
/* fetch('http://puzzle.mead.io/puzzle') //hago un request desde el lado del cliente a la URL
    .then((response)=>{
        response.json() // luego la respuesta del fetch la parseo a un json
    .then((data)=>{
        console.log(data) // para finalmente poder utilizar esa data que me llego del fetch
    })
}) */

/* fetch('/weather?address=boston')
    .then((response)=>{
        response.json()
        .then((data)=>{
            if(data.error){
                return console.log('Theres an error fetching the data')
            }
             console.log(data.location)
             console.log(data.forecast.forecast)
        })
    }) */

      const weatherForm = document.querySelector('form')
    const search = document.querySelector('input')
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')

    weatherForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        messageTwo.textContent=''
        const location = search.value;
        messageOne.textContent='Loading...'
        
        
        fetch('/weather?address=' + search.value)
            .then((response)=>{
                response.json()
                .then((data)=>{
                    if(data.error){
                        return messageOne.textContent = data.error
                    }
                    messageOne.textContent = data.location
                    messageTwo.textContent = 'The forecast for today is ' + data.forecast.forecast + '. Its ' + data.forecast.current+ ' degrees out. But it feels like ' + data.forecast.feelsLike
                })
            })
        
    })

