const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Events {
  constructor() {
  }

  async getYoungestOlympian() {
    const olympian = await database('olympians').select('name', 'age', 'team', 'sport').groupBy('name', 'age', 'team', 'sport').orderBy('age').first()
}

module.exports = Events
