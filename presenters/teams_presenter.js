const Teams = require('../models/teams.js');
const teams = new Teams();

class TeamsPresenter {

  async createTeamsResponse() {
    const data = await teams.getTeams()
    // const formattedData = {}
    // formattedData["olympian_teams"] = data
    return data
  }
}

module.exports = TeamsPresenter
