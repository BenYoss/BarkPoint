const axios = require('axios');
const serpwow = require('../api/serpwow.api.js');

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
