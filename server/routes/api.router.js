const { Router } = require('express');
const serpwow = require('../api/serpwow.api.js');
const sendMessage = require('../api/twilio.api.js');
const personalityVerbs = require('./personalityTypes.json');

const apiRouter = Router();

const toysByVerb = [];

apiRouter.get('/get/toys', (req, res) => {
  /**
   * @verbs is an algorithm that finds dog personality types and outputs key verbs pertaining to
   * the type.
   */
  console.log('this is the req', req);
  const verbs = Object.values(req.query).map((personalityType, i) => {
    if (personalityType) {
      return personalityVerbs[0][i];
    }
    return personalityVerbs[1][i];
  });
  console.log('These are the verbs', verbs);

  /**
   * The function @filterToys searches for toy verbs and filters toys retrieved
   * from the serpwow API by verb contents in title.
   * Once the function finishes firing, the output is a server response of @param {200}
   * and returns the array of @param {toyFilter}
   */
  const filterToys = () => {
    const toyFilter = [];
    console.log('inside filtertoys toysbyverb', toysByVerb);
    toysByVerb.forEach((toy) => verbs.forEach((verb) => {
      if (toy.title.includes(verb)) {
        toyFilter.push(toy);
      }
      console.log('inside filterToys', toyFilter);
    }));
    res.status(200).send(toyFilter);
  };

  const params = {
    q: 'dog toy',
    engine: 'amazon',
    amazon_domain: 'amazon.com',
    include_html: 'false',
  };

  /**
   * Below is the conditional that indicates whether the serpwow API
   * has been called during the instance. If data exists in @toysByVerb .
   * If data does exist, then the block of code executes the previously
   * mentioned @filterToys method.
   */
  if (!toysByVerb.length) {
    serpwow.json(params)
      .then((result) => {
        toysByVerb.push(result.amazon_results);
        filterToys();
      })
      .catch((error) => {
        res.status(500).end(error);
      });
  } else {
    filterToys();
  }
});

apiRouter.post('/api/twilio', (req, res) => {
  const { phoneNumber } = req.body;
  res.sendStatus(201);
  sendMessage(phoneNumber);
});

module.exports = apiRouter;
