/* eslint-disable camelcase */
const { Router } = require('express');
const { Dog, User, Park } = require('../db/models/models');

const dbRouter = Router();
/**
 * Adds a new user into the barkPoint database
 */
dbRouter.post('/data/user', (req, res) => User.createUser(req.body)
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  }));
/**
 * Finds all dogs whose user_id field matches the current sessions user's id
 */
dbRouter.get('/data/dog', ({ user }, res) => {
  const { id_google } = user;
  Dog.findDogs(id_google)
    .then((dogs) => {
      res.status(200).send(dogs);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
/**
 * Adds a new dog into the barkPoint database.
 *
 * @data is equal to the current sessions user's id
 *
 * @personalitytypes is an array of length 3. It's values are booleans with
 * each value correlating to a personality type. Swiping left equaling false
 * and swiping right equaling false.
 */
dbRouter.post('/data/dog', (req, res) => {
  const {
    size, breed, number, id_google, dogname, image, personalitytypes,
  } = req.body;
  return Dog.addDog(dogname, breed, size, number, id_google, image, personalitytypes)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
/**
 * Adds a new toy into a the currently selected dog's toy field (an array)
 *
 * @id is equal to the current dog's mongo-provided ObjectId
 * @body is equal to an object with the to be added toy's info (see dog.js in models)
 */
dbRouter.put('/data/dog/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  return Dog.addToy(id, body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
/**
 * Removes a toy from the currently selected dog's toy field (an array)
 *
 * @id is equal to the current dog's mongo-provided ObjectId
 * @body is equal to an object with the to be deleted toy's info (see dog.js in models)
 */
dbRouter.delete('/data/toy:id', (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  return Dog.removeToy(id, data)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
/**
 * Removes a dog from the barkPoint database
 *
 * @id is equal to the current dog's mongo-provided ObjectId
 */
dbRouter.delete('/data/dog:id', (req, res) => {
  const { id } = req.params;
  return Dog.deleteDog(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
dbRouter.get('/data/park', async (req, res) => {
  const allDogs = await Park.getParks();
  res.status(200).send(allDogs);
});
/**
 * Adds a park into the barkPoint database
 */
dbRouter.post('/data/park', (req, res) => {
  const {
    name, lat, long, comments,
  } = req.body;
  return Park.addPark(name, lat, long, comments)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
/**
 * Updates the comment field of the selected park
 *
 * @name is equal to the name field of the park whose comment you wish to update
 */
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

/**
 * Wipes the existing favorite park from the user's history.
 * The params include an @id for the user and an @body for the
 * specified park.
 */

dbRouter.put('/data/unfavpark/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req; // you only need the park name
  return User.unFavPark(id, body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
/**
 * Adds a park into a the current users parks field (an array)
 *
 * @id is equal to the current user's mongo-provided ObjectId
 * @body is equal to an object with the to be added park's info
 */
dbRouter.put('/data/favpark/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req; // you only need the park name
  return User.favPark(id, body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

/**
 * Below is the getter for favorite parks. This request is made to
 * retrieve the favorite parks from a specific user id @param {string} id .
 *
 * The request outputs the park object data in the form of an @array .
 */
dbRouter.get('/data/favpark', (req, res) => {
  const { id } = req.query;
  User.getFavParks(id)
    .then((parkData) => {
      res.status(200).send(parkData);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
/**
 * Removes a specific park from the barkPoint database based on @name .
 */
dbRouter.delete('/data/park/:name', (req, res) => {
  const { name } = req.params;
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
