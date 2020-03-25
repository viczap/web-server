const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

//Paths
const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials'); 

//Configuration
app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Routing
app.get('/', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Victor Zapata'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About page',
        name : 'Victor Zapata'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help page',
        name : 'Victor Zapata'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name : 'Victor Zapata', 
        errorMessage : 'This help article does not exist.'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            errorMessage: 'You must provide an address'
        });
    }
    
    geocode(req.query.address, (err, geocodeData) => {
        if(err) return res.send({ errorMessage : err });
        forecast(geocodeData.latitude, geocodeData.longitude, (err, forecastData) => {
            if(err) return res.send({ errorMessage : err });
            res.send({
                location : geocodeData.location,
                temperature : forecastData.temperature
            });
        });
    });
    
});

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Victor Zapata', 
        errorMessage : 'Page not found.'
    });
});

app.listen(port, () => {
    console.log(`The server was started successfully at port ${port}.`);
});