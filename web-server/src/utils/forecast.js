const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.DarkSkyApiKey}/${latitude},${longitude}?units=ca`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather sevice!', undefined);
            return;
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined,
                `${body.daily.data[0].summary}` +
                ` It is currently ${body.currently.temperature}°C` +
                ` with a ${body.currently.precipProbability}% chance of rain`);
        }
    });
};

module.exports = forecast;
