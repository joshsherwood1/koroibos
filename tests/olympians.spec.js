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
      {name: 'Elena Maria', sex: 'F', age: 10, height: 70, weight: 40, team: 'Brazil', games: '2016 Summer,Gymnastics', sport: "Running", event: "400m", medal: null},
      {name: 'Gabriella Domenshev', sex: 'F', age: 30, height: 90, weight: 50, team: 'Romania', games: '2016 Summer,Gymnastics', sport: "Swimming", event: "400m", medal: null },
      {name: 'Benji Levi', sex: 'M', age: 40, height: 60, weight: 80, team: 'Israel', games: '2016 Summer,Gymnastics', sport: "Soccer", event: "Gold Medal Match", medal: "Gold"}
    ]);
  });

  afterEach(() => {
    database.raw('truncate table olympians cascade');
  });

  describe('test olympians GET', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/olympians");

      expect(response.statusCode).toBe(200);

      expect(response.body["olympians"].length).toBe(4);
      expect(response.body).toHaveProperty('olympians');
      expect(response.body["olympians"][0]).toHaveProperty('name');
      expect(response.body["olympians"][0]).toHaveProperty('team');
      expect(response.body["olympians"][0]).toHaveProperty('age');
      expect(response.body["olympians"][0]).toHaveProperty('sport');
      expect(response.body["olympians"][0]).toHaveProperty('total_medals_won');
    });
  });

  describe('test GET olympians stats', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/olympian_stats");

      expect(response.statusCode).toBe(200);

      expect(response.body).toHaveProperty('olympian_stats');
      expect(response.body["olympian_stats"]).toHaveProperty("total_competing_olympians");
      expect(response.body["olympian_stats"]["total_competing_olympians"]).toBe(4);
      expect(response.body["olympian_stats"]["average_age:"]).toBe(25);
      expect(response.body["olympian_stats"]["average_weight:"]["unit"]).toBe('kg');
      expect(response.body["olympian_stats"]["average_weight:"]["male_olympians"]).toBe(70);
      expect(response.body["olympian_stats"]["average_weight:"]["female_olympians"]).toBe(45);
      expect(response.body["olympian_stats"]).toHaveProperty("average_weight:");
      expect(response.body["olympian_stats"]).toHaveProperty("average_age:");
    });
  });

  describe('test GET youngest olympian', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/olympians?age=youngest");

      expect(response.statusCode).toBe(200);

      expect(response.body["youngestOlympian"].length).toBe(1);
      expect(response.body["youngestOlympian"][0]).toHaveProperty('name');
      expect(response.body["youngestOlympian"][0]).toHaveProperty('team');
      expect(response.body["youngestOlympian"][0]).toHaveProperty('age');
      expect(response.body["youngestOlympian"][0]).toHaveProperty('sport');
      expect(response.body["youngestOlympian"][0]).toHaveProperty('total_medals_won');
      expect(response.body["youngestOlympian"][0]['name']).toBe("Elena Maria");
      expect(response.body["youngestOlympian"][0]['team']).toBe('Brazil');
      expect(response.body["youngestOlympian"][0]['sport']).toBe('Running');
    });
  });

  describe('test GET oldest olympian', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/olympians?age=oldest");

      expect(response.statusCode).toBe(200);

      expect(response.body["oldestOlympian"].length).toBe(1);
      expect(response.body["oldestOlympian"][0]).toHaveProperty('name');
      expect(response.body["oldestOlympian"][0]).toHaveProperty('team');
      expect(response.body["oldestOlympian"][0]).toHaveProperty('age');
      expect(response.body["oldestOlympian"][0]).toHaveProperty('sport');
      expect(response.body["oldestOlympian"][0]).toHaveProperty('total_medals_won');
      expect(response.body["oldestOlympian"][0]['name']).toBe("Benji Levi");
      expect(response.body["oldestOlympian"][0]['team']).toBe('Israel');
      expect(response.body["oldestOlympian"][0]['sport']).toBe('Soccer');
    });
  });
});
