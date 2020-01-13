const Events = require('../models/events.js');
const events = new Events();

class EventsPresenter {

  async createEventsResponse() {
    const data = await events.getEvents()
    // const formattedData = {}
    // formattedData["olympian_stats"] = data
    return data
  }
}

module.exports = EventsPresenter
