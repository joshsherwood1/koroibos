const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Teams {
  constructor() {
  }

  async getTeams() {
    const teams = await database('olympians').select('team').groupBy('team')
    await Promise.all(teams.map(async (team) => {
      const olympians = await database('olympians').where('team', team.team)
                          .select('name').groupBy('name')
      team["olympians"] = olympians
    }));
    return teams
  }
}

module.exports = Teams
