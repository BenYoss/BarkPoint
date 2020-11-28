const SerpWow = require('google-search-results-serpwow');

require('dotenv').config();

const serpwow = new SerpWow(process.env.SERPWOW_KEY);


module.exports = serpwow;
