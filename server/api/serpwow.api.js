const SerpWow = require('google-search-results-serpwow');

const serpwow = new SerpWow(process.env.SERPWOW_KEY);

module.exports = serpwow;
