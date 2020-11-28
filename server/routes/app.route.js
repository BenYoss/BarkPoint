const { Router } = require('express');
const ToyBox = require('.../client/src/components/ToyBox.jsx');

const appRouter = Router();

app.use('/Toybox', ToyBox)

appRouter.get('/ToyBox', (req, res) => {
    res.redirect();
  });
