const { Router } = require('express');
const { Dog, User, Park } = require('../db/models/models');

const dbRouter = Router();

// add a new user to database
dbRouter.post('/data/user', (req, res) => User(req.body)
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  }));

// get one dog's info from database
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

// add a new dog to database
dbRouter.post('/data/dog', (req, res) => {
  const {
    size, breed, number, dogname, emailUser, personalitytypes,
  } = req.body;
  return Dog.addDog(dogname, breed, size, number, emailUser, personalitytypes)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// add toy to dog's toy-box
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

// delete toy from dog's toy-box
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

// delete dog from database
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

// add a new park to database
dbRouter.post('/data/park', (req, res) => {
  const {
    name, address, comment,
  } = req.body;
  return Park.addPark(name, address, comment)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// update a comment on a park
dbRouter.put('/data/park', (req, res) => {
  const { name, comment } = req.body;
  return Park.updatePark(name, comment)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// delete park from database
dbRouter.delete('/data/park', (req, res) => {
  const { name } = req.query;
  return Park.deletePark(name)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = dbRouter;
