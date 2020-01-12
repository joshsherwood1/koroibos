const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Olympians {
  constructor() {
  }

  async getAllOlympians() {
    const olympians = await database('olympians').select('name', 'age', 'team', 'sport').groupBy('name', 'age', 'team', 'sport')
    await Promise.all(olympians.map(async (olympian) => {
      const returnedOlympian = await database('olympians').whereNotNull('medal').whereNot('medal', 'NULL').where('name', olympian.name).select('name').groupBy('name').count('name')
      if (returnedOlympian.length == 0) {
         olympian['total_medals_won'] = '0'
      }
      if (returnedOlympian.length != 0) {
         olympian['total_medals_won'] = returnedOlympian[0].count
      }
    }));
    return olympians
  }
}

module.exports = Olympians
