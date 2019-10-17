const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getRandFile = require('./../utils/getRandFile');

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
    res.send({
        forcast: 'forecast',
        location: 'location',
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
