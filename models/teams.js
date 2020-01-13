const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Teams {
  constructor() {
  }

  async getTeams() {
    const teams = await database('olympians').select('team').groupBy('team')
    return teams
  }
}

module.exports = Teams
