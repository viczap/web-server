const request = require('request');

const geocode = (searchText, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json?access_token=pk.eyJ1IjoidmljemFwIiwiYSI6ImNrN3FyZGJteTA2NnIza256enF0bmRtdmoifQ.NkR0bkQ9sP-NxLNWvKdf_g&limit=1`;
    request({ url , json : true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to Geolocalzation Service');
        } else if(body.features.length === 0) {
            callback('Unable to get the location.');
        } else {
            callback(undefined, {
                location : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            });
        }
    });
};

module.exports = geocode;