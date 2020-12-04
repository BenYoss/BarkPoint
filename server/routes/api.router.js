const { Router } = require('express');
const serpwow = require('../api/serpwow.api.js');
const personalityVerbs = require('./personalityTypes.json');

const apiRouter = Router();

const toysByVerb = [];

apiRouter.get('/get/toys', (req, res) => {
  let count = 1;
  /**
   * @verbs is an algorithm that finds dog personality types and outputs key verbs pertaining to
   * the type
   */
  const verbs = [];
  const antiVerbs = [];
  Object.values(req.query).forEach((personalityType, i) => {
    const pverbsTrue = Object.values(personalityVerbs[0])[i];
    const pverbsFalse = Object.values(personalityVerbs[1])[i];
    if (JSON.parse(personalityType)) {
      verbs.push(...pverbsTrue);
      antiVerbs.push(...pverbsFalse);
    } else {
      verbs.push(...pverbsFalse);
      antiVerbs.push(...pverbsTrue);
    }
  });
  /**
   * The function @filterToys searches for toy verbs and filters toys retrieved
   * from the serpwow API by verb contents in title.
   * Once the function finishes firing, the output is a server response of @param {200}
   * and returns the array of @param {toyFilter}
   */
  const filterToys = () => {
    const toyFilter = [];
    toysByVerb.forEach((toy) => verbs.forEach((verb) => {
      let isValid = false;
      antiVerbs.forEach((antiVerb) => {
        if (toy.title.includes(verb)
        && !toy.title.includes(antiVerb)
        && !toyFilter.includes(toy)) {
          isValid = true;
        }
      });

      if (isValid) {
        toyFilter.push(toy);
      }
    }));
    toyFilter.slice(0, 20);
    res.status(200).send(toyFilter);
  };

  const params = {
    q: 'dog toy',
    engine: 'amazon',
    amazon_domain: 'amazon.com',
    page: count,
    include_html: 'false',
  };

  /**
   * Below is the conditional that indicates whether the serpwow API
   * has been called during the instance. If data exists in @toysByVerb .
   * If data does exist, then the block of code executes the previously
   * mentioned @filterToys method
   */

  const callSerp = () => {
    if (toysByVerb.length < 200) {
      serpwow.json(params)
        .then((result) => {
          toysByVerb.push(...result.amazon_results);
          count += 1;
          return callSerp();
        })
        .catch((error) => {
          res.status(500).end(error);
        });
    } else {
      filterToys();
    }
  };
  callSerp();
});

module.exports = apiRouter;
