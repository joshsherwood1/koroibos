# Koroibos

#### [Visit Production Application](https://koroibos-olympians.herokuapp.com)


## Table of Contents
 *  [Introduction](https://github.com/joshsherwood1/koroibos#introduction)
 *  [Initial Setup](https://github.com/joshsherwood1/koroibos#intial-setup)
 *  [How to Run Tests](https://github.com/joshsherwood1/koroibos#how-to-run-tests)
 *  [Endpoints](https://github.com/joshsherwood1/koroibos#endpoints)
 *  [Schema Design](https://github.com/joshsherwood1/koroibos#schema-design)
 *  [Known Issues](https://github.com/joshsherwood1/koroibos#known-issues)
 *  [Tech Stack List](https://github.com/joshsherwood1/koroibos#tech-stack-list)
 *  [Core Contributors](https://github.com/joshsherwood1/koroibos#core-contributors)

## Introduction

Koroibos is an API that hosts information regarding Olympians from the 2016 Summer Olympics in Rio de Janeiro, Brazil. Information regarding individual Olympian information, team/country information, sport/event information, and average Olympian statistics are available to access by making API requests.

* [Project Requirements](https://backend.turing.io/module4/projects/take_home_challenge/take_home_challenge_rubric)

* [GitHub Project Board](https://github.com/joshsherwood1/koroibos/projects/1)


 ## Intial Setup

 Follow the following steps to setup application locally. Setup time is 5-10 minutes.

#### Installing necessary dependencies
The easiest way to get started is to run the following command. This will pull down any necessary dependencies that your app will require.

`npm install`

#### Setting up local database and migrations
You’ll need to figure out a name for your database. I suggest calling it something like `olympians_dev`.  

You will also need to update the development section of the knexfile with the database name.


Instructions to create the database and run migrations:
```
psql
CREATE DATABASE DATABASE_NAME_dev;
\q

knex migrate:latest
```

#### Importing data into database
You will need to import the Olympians' information into the database. There are two CSV files included in the repository: olympic_data_2016.csv and olympian_events_2016.csv. The olympic_data_2016.csv file will be imported into the Olympians database, and the olympian_events_2016.csv file will be imported into the Events database. Run the following command in psql to do so.

```
psql

\c DATABASE_NAME_dev

COPY olympians(name, sex, age, height, weight, team, games, sport, event, medal) FROM 'full_file_path_of_olympic_data_2016.csv' delimiter ',' csv NULL AS '';

COPY events(name) FROM 'full_file_path_of_olympian_events_2016.csv' delimiter ',' csv NULL AS '';
```


#### Set up your test database
Most of the setup is going to be same as the one you did before. You’ll notice one small difference with setting the environment flag to `test`.  

```
psql
CREATE DATABASE DATABASE_NAME_test;
\q

knex migrate:latest --env test
```

You will also need to update the test section of the knexfile with the test database name.


 ## How to Run Tests

 Running tests are simple and require you to run the following command below:

`npm test`


 ## Endpoints

Production address:

``` https://koroibos-olympians.herokuapp.com```

To access locally:

```npm start```

``` http://localhost:3000 ```

### Get All Olympians
Returns all olympians from the database. The attributes name, age, team, sport, and total_medals_won are included for each olympian.

If successful, response will contain all resources in JSON format.

Endpoint:

```GET /api/v1/olympians```

[Click here](https://koroibos-olympians.herokuapp.com/api/v1/olympians) to visit the production endpoint.


**Sample Successful Response:**

```
{
  "olympians":
    [
      {
        "name": "Maha Abdalsalam",
        "team": "Egypt",
        "age": 18,
        "sport": "Diving"
        "total_medals_won": 0
      },
      {
        "name": "Ahmad Abughaush",
        "team": "Jordan",
        "age": 20,
        "sport": "Taekwondo"
        "total_medals_won": 1
      },
      {...}
    ]
}

```

### Get Olympian Stats
Returns all olympian stats from the database.

If successful, response will contain all relevant resources in JSON format.

Endpoint:

```GET /api/v1/olympian_stats```

[Click here](https://koroibos-olympians.herokuapp.com/api/v1/olympian_stats) to visit the production endpoint.


**Sample Successful Response:**

```
{
  "olympian_stats": {
    "total_competing_olympians": 2856,
    "average_weight:": {
      "unit": "kg",
      "male_olympians": 79.396379525593,
      "female_olympians": 62.69198664440734
    },
    "average_age:": 26.37464985994398
  }
}

```

### Get Youngest Olympian

Returns youngest olympian information. The attributes name, age, team, sport, and total_medals_won are included for the olympian.

If successful, response will contain all relevant resources in JSON format.

Endpoint: 

```GET /api/v1/olympians?age=youngest```

[Click here](https://koroibos-olympians.herokuapp.com/api/v1/olympians?age=youngest) to visit the production endpoint.


**Sample Successful Response:**

```
{
  "youngestOlympian": [
    {
      "name": "Ana Iulia Dascl",
      "age": 13,
      "team": "Romania",
      "sport": "Swimming",
      "total_medals_won": "0"
    }
  ]
}

```

### Get Oldest Olympian

Returns oldest olympian information. The attributes name, age, team, sport, and total_medals_won are included for the olympian.

If successful, response will contain all relevant resources in JSON format.

Endpoint:

```GET /api/v1/olympians?age=oldest```

[Click here](https://koroibos-olympians.herokuapp.com/api/v1/olympians?age=oldest) to visit the production endpoint.


**Sample Successful Response:**

```
{
  "oldestOlympian": [
    {
      "name": "Julie Brougham",
      "age": 62,
      "team": "New Zealand",
      "sport": "Equestrianism",
      "total_medals_won": "0"
    }
  ]
}

```

### Get All Events

Returns sport names with all related event names for each sport.

If successful, response will contain all relevant resources in JSON format.

Endpoint:

```GET /api/v1/events```

[Click here](https://koroibos-olympians.herokuapp.com/api/v1/events) to visit the production endpoint.


**Sample Successful Response:**

```
{
  "events":
    [
      {
        "sport": "Archery",
        "events": [
          "Archery Men's Individual",
          "Archery Men's Team",
          "Archery Women's Individual",
          "Archery Women's Team"
        ]
      },
      {
        "sport": "Badminton",
        "events": [
          "Badminton Men's Doubles",
          "Badminton Men's Singles",
          "Badminton Women's Doubles",
          "Badminton Women's Singles",
          "Badminton Mixed Doubles"
        ]
      },
      {...}
    ]
}

```

### Get All Medalists

Returns each event name along with the Olympians who won a gold, silver, or bronze medal for each sport (some events will be missing/have no medalists, and some will have multiple gold, silver, and bronze medalists). Medalists information will include the attributes name, age, team, and the medal won in the event.

If successful, response will contain all relevant resources in JSON format.

Endpoint:

```GET /api/v1/events/:id/medalists```

[Click here](https://koroibos-olympians.herokuapp.com/api/v1/events/10/medalists) to visit the production endpoint.


**Sample Successful Response:**

```
{
  "event": "Taekwondo Women's Flyweight",
  "medalists": [
    {
      "name": "Patimat Abakarova",
      "team": "Azerbaijan",
      "age": 21,
      "medal": "Bronze"
    },
    {
      "name": "Tijana Bogdanovi",
      "team": "Serbia",
      "age": 18,
      "medal": "Silver"
    }
  ]
}

```

### Get All Teams

Returns each team name along with the Olympians who belong to that team. Olympian information will include the attributes name, age, sport, and total medals won.

If successful, response will contain all relevant resources in JSON format.

Endpoint:

```GET /api/v1/teams```

[Click here](https://koroibos-olympians.herokuapp.com/api/v1/teams) to visit the production endpoint.


**Sample Successful Response:**

```
{
  "teams":
    [
      {
        "country": "Algeria",
        "olympians": [
             {
        "name": "Maha Abdalsalam",
        "team": "Algeria",
        "age": 18,
        "sport": "Diving"
        "total_medals_won": 0
      },
      {
        "name": "Ahmad Abughaush",
        "team": "Algeria",
        "age": 20,
        "sport": "Taekwondo"
        "total_medals_won": 1
      },
        ]
      },
      {...}
    ]
}

```




 ## Schema Design

![image](https://user-images.githubusercontent.com/49769068/72276866-c92d4380-3628-11ea-850c-6f0cb73120d5.png)

## Known Issues

Sometimes the data does not come back from the database right away when making an API request to the production endpoint. Simply wait a few seconds and refresh the page, and the endpoint will be working.


 ## Tech Stack List
   *  [Node.js](https://nodejs.org/en/)
   *  [Knex](http://knexjs.org/)
   *  [PostgreSQL](https://www.postgresql.org/)
   *  [Heroku](https://heroku.com/) -->

  ## Contributor Information

  ### [Joshua Sherwood](https://github.com/joshsherwood1)
   [View LinkedIn](https://www.linkedin.com/in/sherwoodjosh/)
