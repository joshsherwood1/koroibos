const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Stats {
  constructor() {
  }

  async getAllStats() {
    const formattedData = {}
    const olympiansCount = await database('olympians').select('name', 'age', 'team', 'weight', 'height').groupBy('name', 'age', 'team', 'weight', 'height')
    formattedData["total_competing_olympians"] = olympiansCount.length

    formattedData["average_weight:"] = {}
    formattedData["average_weight:"]["unit"] = 'kg'
    var totalMen = 0
    const maleOlympians = await database('olympians').where('sex', 'M').whereNotNull('weight').select('name', 'age', 'team', 'weight', 'height').groupBy('name', 'age', 'team', 'weight', 'height')
    await Promise.all(maleOlympians.map(async (olympian) => {
      const parsed = parseInt(olympian.weight)
      totalMen += parsed
    }));

    var maleOlympiansCount = maleOlympians.length
    var averageMaleWeight = (totalMen / maleOlympiansCount)
    formattedData["average_weight:"]["male_olympians"] = averageMaleWeight

    var totalWomen = 0
    const femaleOlympians = await database('olympians').where('sex', 'F').whereNotNull('weight').select('name', 'age', 'team', 'weight', 'height').groupBy('name', 'age', 'team', 'weight', 'height')
    await Promise.all(femaleOlympians.map(async (olympian) => {
      const parsed = parseInt(olympian.weight)
      totalWomen += parsed
    }));

    var femaleOlympiansCount = femaleOlympians.length
    var averageFemaleWeight = (totalWomen / femaleOlympiansCount)
    formattedData["average_weight:"]["female_olympians"] = averageFemaleWeight

    var totalAge = 0
    await Promise.all(olympiansCount.map(async (olympian) => {
      const parsed = parseInt(olympian.age)
      totalAge += parsed
    }));

    var olympiansTotalCount = olympiansCount.length
    var averageAge = (totalAge / olympiansTotalCount)
    formattedData["average_age:"] = averageAge

    return formattedData
  }
}

module.exports = Stats
