var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const EventsPresenter = require('../../../presenters/events_presenter.js');
const eventsPresenter = new EventsPresenter();


router.get('/', async function (request, response) {
   await eventsPresenter.createEventsResponse()
    .then((data) => {
       response.status(200).json(data);
     })
     .catch((error) => {
       return response.status(500).json({ error });
    });
});

router.get('/:id/medalists', async function (request, response) {
  try {
    await database('events').where('id', request.params.id).select('name')
  }
catch(error) {
  return response.status(404).json({"error": "Record not found"});
}
   await eventsPresenter.createMedalistsResponse(request.params.id)
    .then((data) => {
       response.status(200).json(data);
     })
     .catch((error) => {
       return response.status(500).json({ error });
    });
});

module.exports = router;
