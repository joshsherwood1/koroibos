var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('test olympians path for get all request', () => {
  beforeEach(async () => {
    await database.raw('truncate table olympians cascade');

    await database('olympians').insert([
      {name: 'Denis Mikhaylovich Ablyazin', sex: 'M', age: 20, height: 40, weight: 60, team: 'Russia', games: '2016 Summer,Gymnastics', sport: "Gymnastics", event: "Men's Horse Vault", medal: "Silver"},
      {name: 'Denis Mikhaylovich Ablyazin', sex: 'M', age: 20, height: 40, weight: 60, team: 'Russia', games: '2016 Summer,Gymnastics', sport: "Gymnastics", event: "Men's Floor", medal: "Bronze"},
      {name: 'Elena Maria', sex: 'F', age: 10, height: 70, weight: 40, team: 'Brazil', games: '2016 Summer,Gymnastics', sport: "Gymnastics", event: "Women's Beam", medal: null},
      {name: 'Gabriella Domenshev', sex: 'F', age: 30, height: 90, weight: 50, team: 'Romania', games: '2016 Summer,Gymnastics', sport: "Surfing", event: "Women's Big Wave", medal: null },
      {name: 'Benji Levi', sex: 'M', age: 40, height: 60, weight: 80, team: 'Israel', games: '2016 Summer,Gymnastics', sport: "Surfing", event: "Men's Little Wave", medal: "Gold"}
    ]);
  });

  afterEach(() => {
    database.raw('truncate table olympians cascade');
  });

  describe('test olympians GET', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/events");

      expect(response.statusCode).toBe(200);

      expect(response.body["events"].length).toBe(4);
      expect(response.body).toHaveProperty('events');
      expect(response.body["events"][0]).toHaveProperty('sports');
      expect(response.body["events"][0]["events"]).tobe(['events']);
    });
  });
});
