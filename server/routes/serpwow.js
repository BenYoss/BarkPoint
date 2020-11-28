const SerpWow = require('google-search-results-serpwow');
const axios = require('axios');

const serpwow = new SerpWow('A1634A2611604869A067E266E3F32325');

axios.get('/get/toys', (res) => {
  const params = {
    q: 'dog toy',
    engine: 'amazon',
    amazon_domain: 'amazon.com',
    include_html: 'false',
  };
  serpwow.json(params)
    .then((result) => {
      res.send(JSON.stringify(result.amazon_results, 0, 2));
    })
    .catch((error) => {
      console.error(error);
    });
});
