const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, './../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

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

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});
