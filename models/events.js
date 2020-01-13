const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Events {
  constructor() {
  }

  async getEvents() {
    const sports = await database('olympians').select('sport').groupBy('sport')
    await Promise.all(sports.map(async (sport) => {
      const events = await database('olympians').whereNotNull('event')
                          .whereNot('event', 'NULL').where('sport', sport.sport)
                          .select('event').groupBy('event')
      sport["events"] = []
      await Promise.all(events.map(async (event) => {
        sport["events"].push(event.event)
      }));
    }));
    return sports
  }

  async getMedalists(id) {
    const data = {}
    const eventInfo = await database('events').where('id', id).select('name')
    const medalists = await database('olympians')
                      .where('event', eventInfo[0]["name"])
                      .whereNotNull('medal').whereNot('medal', 'NULL')
                      .select('name', 'team', 'age', 'medal')
    data["event"] = eventInfo[0]["name"]
    data["medalists"] = medalists
    return data
  }
}

module.exports = Events
