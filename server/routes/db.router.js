const { Router } = require('express');
const { Dog, User } = require('../db/models/models');

const dbRouter = Router();

dbRouter.post('/data/user', (req, res) => User(req.body)
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  }));

dbRouter.get('/data/dog', (req, res) => {
  const { options } = req.query;
  return Dog.findDogs(options)
    .then((dogs) => {
      if (dogs.length) {
        res.status(200).send(dogs);
      }
      res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

dbRouter.post('/data/dog', (req, res) => {
  const {
    size, breed, number, dogname,
  } = req.body;
  return Dog.addDog(dogname, breed, size, number)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

dbRouter.put('/data/dog', (req, res) => {
  const { id, body } = req.body;
  return Dog.addToy(id, body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

dbRouter.delete('/data/toy', (req, res) => {
  const { id } = req.query;
  return Dog.removeToy(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

dbRouter.delete('/data/dog', (req, res) => {
  const { id } = req.query;
  return Dog.removeDog(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = dbRouter;
