const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getRandFile = require('./utils/getRandFile');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '/../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const fileNotFoundImgPath = path.join(__dirname, './../public/img/404');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup routes

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Matthew Polsom',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Matthew Polsom',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Matthew Polsom',
        helpText: 'There is no help to be found.',
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'You must provide an address!',
        });
    }

    geocode(address, (error, {longitude, latitude, location}) => {
        if (error) {
            return res.send({error});
        }

        forecast(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast,
                location,
                address,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!',
        });
    }

    console.log(req.query);
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Matthew Polsom',
        file: getRandFile(fileNotFoundImgPath),
        errorText: `Help page ${req.url.slice(req.url.lastIndexOf('/') + 1)} not found`,
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Matthew Polsom',
        file: getRandFile(fileNotFoundImgPath),
        errorText: 'Page not found',
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});
