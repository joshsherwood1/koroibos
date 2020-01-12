var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const StatsPresenter = require('../../../presenters/stats_presenter.js');
const statsPresenter = new StatsPresenter();


router.get('/', async function (request, response) {
 await statsPresenter.createStatsResponse()
  .then((data) => {
     response.status(200).json(data);
   })
   .catch((error) => {
     return response.status(500).json({ error });
   });
});

module.exports = router;
