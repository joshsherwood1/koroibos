const Events = require('../models/events.js');
const events = new Events();

class EventsPresenter {

  async createEventsResponse() {
    const data = await events.getEvents()
    const formattedData = {}
    formattedData["events"] = data
    return formattedData
  }
}

module.exports = EventsPresenter
