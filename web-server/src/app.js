const path = require('path');
const express = require('express');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '/../public');
const viewsPath = path.join(__dirname, '../templates');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

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
        helpMessage: 'There is no help to be found.',
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forcast: 'forecast',
        location: 'location',
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});
