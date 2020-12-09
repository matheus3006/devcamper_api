const NodeGeocoder = require('node-geocoder');


const options = {
  provider: 'opencage',
  httpAdapter: 'https',
  apiKey:  '076bdfdee2594a71b07767dd9a10dade',
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;