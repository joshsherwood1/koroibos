var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const OlympiansPresenter = require('../../../presenters/olympians_presenter.js');
const olympiansPresenter = new OlympiansPresenter();


router.get('/', async function (request, response) {
 await olympiansPresenter.createOlympiansResponse()
  .then((data) => {
     response.status(200).json(data);
   })
   .catch((error) => {
     return response.status(500).json({ error });
   });
});

// router.get('/', async function (request, response) => {
//   try {
//     let data = await olympians.getAllOlympians()
//     return response.status(200).json(data);
//   }
//   catch(error) {
//     return response.status(500).json({"error": "Request could not be handled"});
//   }
// });

module.exports = router;
