var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const TeamsPresenter = require('../../../presenters/teams_presenter.js');
const teamsPresenter = new TeamsPresenter();


router.get('/', async function (request, response) {
 await teamsPresenter.createTeamsResponse()
  .then((data) => {
     response.status(200).json(data);
   })
   .catch((error) => {
     return response.status(500).json({ error });
   });
});

module.exports = router;
