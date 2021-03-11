const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Initialise Express
const app = express();

// Setup templating engine 
app.set('view engine', 'hbs');

// Path definitions
const publicDir = path.join(__dirname, '../pub')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

// Paths setup
app.use(express.static(publicDir));
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'My Weather App',
        name: 'Ryan Dawkes'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ryan Dawkes'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help page',
        name: 'Ryan Dawkes'
    })
})

// Use query string in URL to get weather data
app.get('/weather', (req, res) => {
    // If no address query string, return error
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    // Run geocode function based on address in query string
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        // Return error message if something goes wrong (e.g. no location found)
        if (error) {
            return res.send({ error })
        }

        // Run forecast function using lat & lon data retreived from Geocode function
        forecast(latitude, longitude, (error, forecastData) => {
            // Return error message if something goes wrong (e.g. no data found)
            if (error) {
                return res.send({ error })
            }

            // Send response object to browser with relevant data
            res.send({ 
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    });
});

/* 
* Using the 'req' parameter object, you can receive any query strings within the URL. For example, if you had a URL of 'http://mydomain.com/products?search=games',
* then by running 'console.log(req.query)', you would get back an object with the 'search' query string as an object in the terminal, such as:
* { search: 'games' }
*/ 
app.get('/products', (req, res) => {
    if (!req.query.search) {
        console.log(res.send({
            error: 'You must provide a search term!'
        }))
    }
    res.send({
        products: []
    })
})

// Error routes
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help - 404 Error',
        name: 'Ryan Dawkes',
        errorMessage: 'No HELP article could be found'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        name: 'Ryan Dawkes',
        errorMessage: 'This page could not be found'
    });
})

// Server port
app.listen(3000, () => {
    console.log('The server is running on port 3000')
});