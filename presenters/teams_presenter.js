const Teams = require('../models/teams.js');
const teams = new Teams();

class TeamsPresenter {

  async createTeamsResponse() {
    const data = await teams.getTeams()
    const formattedData = {}
    formattedData["teams"] = data
    return formattedData
  }
}

module.exports = TeamsPresenter
