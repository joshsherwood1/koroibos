var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const OlympiansPresenter = require('../../../presenters/olympians_presenter.js');
const olympiansPresenter = new OlympiansPresenter();


router.get('/', async function (request, response) {
  if (request.query.age === 'youngest') {
    await olympiansPresenter.createYoungestResponse()
  }
 await olympiansPresenter.createOlympiansResponse()
  .then((data) => {
     response.status(200).json(data);
   })
   .catch((error) => {
     return response.status(500).json({ error });
   });
});

module.exports = router;
