const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/bfd39daca233d538e84deebb497bd333/${latitude},${longitude}?units=si`;
    request({ url , json : true }, (err, response) => {
        if(err) {
            callback('Unable to connect to Weather Service');
        } else if(response.body.error) {
            callback('Unable to get the location');
        } else {
            const { temperature, precipProbability } = response.body.currently;
            callback(undefined, {
                temperature,
                precipProbability
            });
        }
    });
};

module.exports = forecast;