const { Router } = require('express');
const serpwow = require('../api/serpwow.api.js');
const sendMessage = require('../api/twilio.api.js');
const personalityVerbs = require('./personalityTypes.json');

const apiRouter = Router();

let toysByVerb;

apiRouter.get('/get/toys', (req, res) => {
  /**
   * @verbs is an algorithm that finds dog personality types and outputs key verbs pertaining to
   * the type.
   */
  const verbs = [];
  const antiVerbs = [];
  Object.values(req.query).forEach((personalityType, i) => {
    const pverbsTrue = Object.values(personalityVerbs[0])[i];
    const pverbsFalse = Object.values(personalityVerbs[1])[i];
    if (JSON.parse(personalityType)) {
      verbs.push(pverbsTrue);
      antiVerbs.push(pverbsFalse);
    }
    verbs.push(pverbsFalse);
    antiVerbs.push(pverbsTrue);
  });
  /**
   * The function @filterToys searches for toy verbs and filters toys retrieved
   * from the serpwow API by verb contents in title.
   * Once the function finishes firing, the output is a server response of @param {200}
   * and returns the array of @param {toyFilter}
   */
  const filterToys = () => {
    const toyFilter = [];
    toysByVerb.forEach((toy) => verbs.flat().forEach((verb) => {
      let isInvalid = false;
      antiVerbs.flat()
        .forEach((antiVerb) => {
          if (toy.title.includes(verb) && !toy.title.includes(antiVerb)
          && !toyFilter.includes(toy)) {
            console.warn();
          } else {
            isInvalid = true;
          }
        });
      if (!isInvalid) {
        toyFilter.push(toy);
      }
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
  if (!toysByVerb) {
    serpwow.json(params)
      .then((result) => {
        toysByVerb = result.amazon_results;
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
