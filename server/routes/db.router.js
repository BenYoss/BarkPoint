const { Router } = require('express');
const { Dog, User } = require('../db/models/models');

const dbRouter = Router();

dbRouter.post('/data/user', (req, res) => {
  User(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

dbRouter.get('/data/dog', (req, res) => {
  const { options } = req.query;

  Dog.findDogs(options)
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
  console.log("inside db.routes", req.body);
  const {
    dogname, breed, size, image,
  } = req.body;

  Dog.addDog(dogname, breed, size, image)
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
  Dog.addToy(id, body)
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

  Dog.removeToy(id)
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

  Dog.removeDog(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = dbRouter;
