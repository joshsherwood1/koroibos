const Events = require('../models/events.js');
const events = new Events();

class EventsPresenter {

  async createEventsResponse() {
    const data = await events.getEvents()
    const formattedData = {}
    formattedData["events"] = data
    return formattedData
  }

  async createMedalistsResponse(id) {
    const data = await events.getMedalists(id)
    return data
  }
}

module.exports = EventsPresenter
