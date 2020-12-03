const { Router } = require('express');
const { Dog, User, Park } = require('../db/models/models');

const dbRouter = Router();
/**
 * Adds a new user into the barkPoint database
 */
dbRouter.post('/data/user', (req, res) => User(req.body)
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  }));
/**
 * Finds all dogs whose user_email field matches the current sessions user's email
 */
dbRouter.get('/data/dog', ({ user }, res) => {
  const { _json } = user;
  Dog.findDogs(_json.email)
    .then((dogs) => {
      if (dogs.length) {
        res.status(200).send(dogs);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});
/**
 * Adds a new dog into the barkPoint database.
 *
 * @data is equal to the current sessions user's email
 *
 * @personalitytypes is an array of length 3. It's values are booleans with
 * each value correlating to a personality type. Swiping left equaling false
 * and swiping right equaling false.
 */
dbRouter.post('/data/dog', (req, res) => {
  const {
    size, breed, number, dogname, image, personalitytypes, data,
  } = req.body;
  return Dog.addDog(dogname, breed, size, number, data, image, personalitytypes)
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
      // console.log('aanythinh');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  // return dog.then(console.log('inside dog', dog));
});
/**
 * Removes a toy from the currently selected dog's toy field (an array)
 *
 * @id is equal to the current dog's mongo-provided ObjectId
 * @body is equal to an object with the to be deleted toy's info (see dog.js in models)
 */
dbRouter.delete('/data/toy:id', (req, res) => {
  const { id } = req.params;
  const { data } = req;
  // console.log('in delete', id, data);
  return Dog.removeToy(id, data)
    .then(() => {
      // console.log('wo');
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
dbRouter.get('/data/park', async (req, res) => {
  const allDogs = await Park.getParks();
  console.warn(allDogs);
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

dbRouter.put('/data/unfavpark', (req, res) => {
  const { id } = req.query;
  const { body } = req; // you only need the park name
  console.warn('id in db router for park', id);
  return User.unfavPark(id, body)
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
dbRouter.put('/data/favpark', (req, res) => {
  const { id } = req.query;
  const { body } = req; // you only need the park name
  console.warn('id in db router for park', id);
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
