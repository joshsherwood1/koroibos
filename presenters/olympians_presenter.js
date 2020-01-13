const Olympians = require('../models/olympians.js');
const olympians = new Olympians();

class OlympiansPresenter {

  async createOlympiansResponse() {
    const data = await olympians.getAllOlympians()
    const formattedData = {}
    formattedData["olympians"] = data
    return formattedData
  }

  async createYoungestResponse() {
    const data = await olympians.getYoungestOlympian()
    const formattedData = [ data ]
    return formattedData
  }
}

module.exports = OlympiansPresenter
