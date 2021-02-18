const path = require('path') // es un modulo de node para trabajar con rutas, no necesito instalarlo
const express = require('express'); //aqui requiero el paquete de express
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

//console.log(__dirname) // es un valor que nos da node, contiene la ruta al directorio
//console.log(__filename) // es un valor que nos da node, contiene la ruta al archivo
//console.log(path.join(__dirname, '../public')) // es una funcion que devuelve la ruta del archivo, solo hay que pasarle las partes.
//le paso dirname como primer parametro y como segundo un string para manipular el path

const app = express(); // aqui creo la instancia de express que voy a usar
const port = process.env.PORT || 3000

//defino los paths que voy a usar en mi configuracion de express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../src/templates/views') // si quisiera poner mis templates de hbs en otra carpeta
const partialsPath = path.join(__dirname, '../src/templates/partials')

//configuro handlebars y la ubicacin del folder
app.set('view engine', 'hbs') // con esta linea le digo a mi app que use handlebars
app.set('views', viewsPath) // aqui le digo donde buscar la carpeta que tiene todos los templates
hbs.registerPartials(partialsPath)

//configuro directorio estatico que sirve los htmls
app.use(express.static(publicDirectoryPath)) //static toma el path del folder que queremos servir y lo muestra en home
//ahora puedo acceder a localhost:3000/about.html o localhost:3000/help.html 

// esta ruta renderiza mi template de handlebars
// render nos permite configurar nuestras vistas, y como configuramos express para usar handlebars
// ahora podemos renderizar un template, solo debe coincidir el nombre del archivo, con el que tengo en views
// el segundo argumento que le paso a render son los valores que quiero renderizar en el template
app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather App',
        name: 'Carlirows Perrirow'
    }) 
})                    

app.get('/help', (req, res) => { //express coje el json le da stringify automaticamente y lo manda al browser
    res.render('help', {
        message: 'this is a help message  S .  O . S ',
        title: 'Help',
        name: 'Carli Perri'
    })    
})

app.get('/about', (req, res) => { // puedo servir html siempre y cuando lo ponga entre comillas
    res.render('about', {
        title: 'About me',
        name: 'Carli Perri'
    })
});

app.get('/weather', (req, res) => {
  if(!req.query.address){
      return res.send({
          error:'You must provide an address'
      })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
    if (error){
        return res.send({error})
     }
     forecast(latitude, longitude,(error, forecastData)=>{
         if(error){
             return res.send({error})
         }
         res.send({
            forecast: forecastData,
            location,
            address: req.query.address
         })
     })
  })
});

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({               // al poner un return  aqui no hace falta que ponga el else, pues si se cumple la 
                                        //condicion el return mata la ejecucion del codigo
            error:'You must provide a search term'
        })
    } 
        console.log(req.query) // en req.query vienen los querystrings del browser ?query=string&otroquery=otrostring
        res.send({
            products: []
        })
        
}) 


app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'No te puedo ayudar amigo',
        name: 'Carlirows',
        title: '404 not found :('
    })  
})

app.get('*', (req, res) =>{ // cuando pongo asterisco hago referencia a todo lo que no he especificado, debe ir al final con eso express sabe que se ha especificado y que no
    res.render('404', {
        error: 'algo ha salido mal',
        name: 'Carlirows',
        title: '404 not found :('
    })  
})


app.listen(port, ()=> {
    console.log('Server is up and running on port 3000.')
})