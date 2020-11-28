const { Router } = require('express');
const serpwow = require('../api/serpwow.api.js');
const sendMessage = require('../api/twilio.api.js');

const apiRouter = Router();

apiRouter.get('/get/toys', (res) => {
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

apiRouter.post('/api/twilio', (req, res) => {
  const { phoneNumber } = req.body;
  sendMessage(phoneNumber);
  res.sendStatus(201);
});

module.exports = apiRouter;
