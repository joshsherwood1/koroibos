var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('test olympians path for get all request', () => {
  beforeEach(async () => {
    await database.raw('truncate table olympians cascade');
    await database.raw('truncate table events cascade');

    await database('olympians').insert([
      {name: 'Denis Mikhaylovich Ablyazin', sex: 'M', age: 20, height: 40, weight: 60, team: 'Russia', games: '2016 Summer,Gymnastics', sport: "Gymnastics", event: "Men's Horse Vault", medal: "Silver"},
      {name: 'Denis Mikhaylovich Ablyazin', sex: 'M', age: 20, height: 40, weight: 60, team: 'Russia', games: '2016 Summer,Gymnastics', sport: "Gymnastics", event: "Men's Floor", medal: "Bronze"},
      {name: 'Elena Maria', sex: 'F', age: 10, height: 70, weight: 40, team: 'Brazil', games: '2016 Summer,Gymnastics', sport: "Gymnastics", event: "Women's Beam", medal: null},
      {name: 'Gabriella Domenshev', sex: 'F', age: 30, height: 90, weight: 50, team: 'Romania', games: '2016 Summer,Gymnastics', sport: "Surfing", event: "Women's Big Wave", medal: null },
      {name: 'Benji Levi', sex: 'M', age: 40, height: 60, weight: 80, team: 'Israel', games: '2016 Summer,Gymnastics', sport: "Surfing", event: "Men's Little Wave", medal: "Gold"}
    ]);

    await database('events').insert([
      {id: 1, name: "Men's Horse Vault"},
      {id: 2, name: "Men's Floor"},
      {id: 3, name: "Women's Beam"},
      {id: 4, name: "Women's Big Wave"},
      {id: 5, name: "Men's Little Wave"}
    ]);
  });

  afterEach(() => {
    database.raw('truncate table olympians cascade');
    database.raw('truncate table events cascade');
  });

  describe('test events GET', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/events");

      expect(response.statusCode).toBe(200);

      expect(response.body["events"].length).toBe(2);
      expect(response.body["events"][0]["sport"]).toBe("Surfing");
      expect(response.body["events"][0]["events"][0]).toBe("Men's Little Wave");
    });
  });

  describe('test medalists GET', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/events/1/medalists");

      expect(response.statusCode).toBe(200);

      console.log(response.body)

      expect(response.body).toHaveProperty('event');
      expect(response.body).toHaveProperty('medalists');
      expect(response.body["medalists"][0]["name"]).toBe('Denis Mikhaylovich Ablyazin');
      expect(response.body["medalists"][0]["team"]).toBe('Russia');
      expect(response.body["medalists"][0]["medal"]).toBe('Silver');
    });

    it('sad path', async () => {
      const response = await request(app)
        .get("/api/v1/events/kjashdfaksjhf/medalists");

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Record not found');
    });
  });
});
