const Stats = require('../models/stats.js');
const stats = new Stats();

class StatsPresenter {

  async createStatsResponse() {
    const data = await stats.getAllStats()
    const formattedData = {}
    formattedData["olympian_stats"] = data
    return formattedData
  }
}

module.exports = StatsPresenter
