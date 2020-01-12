# Koroibos

<!-- [![Build Status](https://travis-ci.com/Turing-MOD4-Cross-Pollination/be-help-yourself.svg?branch=master)](https://travis-ci.com/Turing-MOD4-Cross-Pollination/be-help-yourself) -->

Koroibos is an API that hosts information regarding Olympians from the 2016 Summer Olympics in Rio de Janeiro, Brazil.

<!-- #### [Visit Production Application](https://stormy-depths-45174.herokuapp.com/resources) -->


<!-- ## Table of Contents
 *  [Introduction](https://github.com/Turing-MOD4-Cross-Pollination/be-help-yourself#introduction)
 *  [Initial Setup](https://github.com/Turing-MOD4-Cross-Pollination/be-help-yourself#intial-setup)
 *  [How to Run Tests](https://github.com/Turing-MOD4-Cross-Pollination/be-help-yourself#how-to-run-tests)
 *  [Endpoint](https://github.com/Turing-MOD4-Cross-Pollination/be-help-yourself#endpoint)
 *  [Schema Design](https://github.com/Turing-MOD4-Cross-Pollination/be-help-yourself#schema-design)
 *  [Tech Stack List](https://github.com/Turing-MOD4-Cross-Pollination/be-help-yourself#tech-stack-list)
 *  [Core Contributors](https://github.com/Turing-MOD4-Cross-Pollination/be-help-yourself#core-contributors) -->

<!-- ## Introduction

* [Project Requirements](https://backend.turing.io/module4/projects/cross_pollination/cross_pollination_spec)

* [GitHub Project Board](https://github.com/orgs/Turing-MOD4-Cross-Pollination/projects/1) -->


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
You will need to import the Olympians' information into the database. Run the following command in psql to do so.

```
psql
\c DATABASE_NAME_dev
COPY olympians(name, sex, age, height, weight, team, games, sport, event, medal) FROM 'complete_file_path_of_csv_file' delimiter ',' csv NULL AS 'NULL';


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
Returns all resources from the database. The attributes id, name, website, street, city, state, zip code, contact, notes, category, subcategory, and favorited can also be requested for each resource.

If successful, response will contain all resources in JSON format.

```GET /api/v1/olympians```


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

    <!--

```

### Get All Resources By Category
Returns all resources from the database that have a specified category. The attributes id, name, website, street, city, state, zip code, contact, notes, category, subcategory, and favorited can also be requested for each resource.

If successful, response will contain all relevant resources in JSON format.

**Sample Request Query:**

```
    {
      resources_by_category(category: "Baby Items") {
        name
        website
        street
        city
        state
      }
    }
```


**Sample Successful Response:**

```
{
  "data": {
    "resources_by_category": [
      {
        "name": "Wee Cycle",
        "website": "http://www.weecycle.org/",
        "street": "789 Sherman Street #250",
        "city": "Denver",
        "state": "CO"
      }
    ]
  }
}
```

### Get All Resources By ID
Returns the resource from the database that have a specified id. The attributes id, name, website, street, city, state, zip code, contact, notes, category, subcategory, and favorited can also be requested for the resource.

If successful, response will contain all relevant resources in JSON format.

**Sample Request Query:**

```
   {
      resource(id: 30) {
        name
        website
        street
        city
        state
      }
    }
```


**Sample Successful Response:**

```
{
  "data": {
    "resource": {
      "name": "Volunteers of America Mission",
      "website": "http://www.voacolorado.org/gethelp-denvermetro-\n foodnutrition-themission",
      "street": "2877 Lawrence Street Denver",
      "city": "Denver",
      "state": "CO"
    }
  }
}
```

### Get All Resources By City
Returns all resources from the database that have a specified city. The attributes id, name, website, street, city, state, zip code, contact, notes, category, subcategory, and favorited can also be requested for each resource.

If successful, response will contain all relevant resources in JSON format.

**Sample Request Query:**

```
    {
      resources_by_city(city: "Commerce City") {
        name
        website
        street
        city
        state
      }
    }
```


**Sample Successful Response:**

```
{
  "data": {
    "resources_by_city": [
      {
        "name": "Dr. Lawrence Willis (Commerce City Dental Center)",
        "website": "n/a",
        "street": "6537 E. 72nd Place",
        "city": "Commerce City",
        "state": "CO"
      }
    ]
  }
}
```

### Get All Resources By Zip Code
Returns all resources from the database that have a specified zip code. The attributes id, name, website, street, city, state, zip code, contact, notes, category, subcategory, and favorited can also be requested for each resource.

If successful, response will contain all relevant resources in JSON format.

**Sample Request Query:**

```
    {
      resources_by_zip_code(zip_code: "80226") {
        name
        website
        street
        city
        state
      }
    }
```


**Sample Successful Response:**

```
{
  "data": {
    "resources_by_zip_code": [
      {
        "name": "Rocky Mountain SER - Head Start Program",
        "website": "http://www.rmser.org/rmser-programs/headstart-program",
        "street": "150 Sheridan Blvd",
        "city": "Denver",
        "state": "CO"
      }
    ]
  }
}
```

### Get All Resources By Notes
Returns all resources from the database that have notes that contain something specified by the user. The attributes id, name, website, street, city, state, zip code, contact, notes, category, subcategory, and favorited can also be requested for each resource.

If successful, response will contain all relevant resources in JSON format.

**Sample Request Query:**

```
    {
      resources_by_notes(notes: "boxes") {
        name
        website
        street
        notes
      }
    }
```


**Sample Successful Response:**

```
{
  "data": {
    "resources_by_notes": [
      {
        "name": "Denver Rescue Mission: Ministry Outreach Center",
        "website": "https://www.denverrescuemission.org/emergency-services",
        "street": "5725 East 39th Avenue",
        "notes": "Food boxes available once a month: Tues.-Sat. 8:30-11am & 11:30am-4 pm"
      },
      {
        "name": "Denver Rescue Mission: Harvest Farms",
        "website": "https://www.denverrescuemission.org/emergency-services",
        "street": "4240 E. County Road 66",
        "notes": "Food boxes available once a month: Mon.-Fri. 9:45 am-11:45 am & 1pm-3:45 pm, Saturday 8am - 12pm"
      }
    ]
  }
}
```

### Get All Resources By Subcategory
Returns all resources from the database that have a specified subcategory. The attributes id, name, website, street, city, state, zip code, contact, notes, category, subcategory, and favorited can also be requested for each resource.

If successful, response will contain all relevant resources in JSON format.

**Sample Request Query:**

```
    {
      resources_by_subcategory(subcategory: "After School Programs") {
        name
        website
        street
        city
        state
      }
    }
```


**Sample Successful Response:**

```
{
  "data": {
    "resources_by_subcategory": [
      {
        "name": "YMCA Child Care Center",
        "website": "http://www.denverymca.org/child-care-camps",
        "street": "2625 S Colorado Blvd",
        "city": "Denver",
        "state": "CO"
      },
      {
        "name": "Sun Valley Youth Center",
        "website": "http://www.sunvalleyyouthcenter.org/programs",
        "street": "1230 Decatur St",
        "city": "Denver",
        "state": "CO"
      }
    ]
  }
}
```

### Get All Resources By Favorited
Returns all resources from the database that have a specified favorited status. The attributes id, name, website, street, city, state, zip code, contact, notes, category, subcategory, and favorited can also be requested for each resource.

If successful, response will contain all relevant resources in JSON format.

**Sample Request Query:**

```
    {
      resources_by_favorited(favorited: null) {
        name
        favorited
      }
    }
```


**Sample Successful Response:**

```
{
  "data": {
    "resources_by_favorited": [
      {
        "name": "Wee Cycle",
        "favorited": null
      }
    ]
  }
}
```


### Get All Recovery Groups
Returns all recovery groups from the database. The attributes title, subtitle, and address can also be requested for each recovery group.

``` GET /api/v1/resources ```

If successful, response will contain all recovery groups in JSON format.

**Sample Request Query:**

```
{
  recovery{
    title
    subtitle
    address
  }
}
```


**Sample Successful Response:**

```
{
  "data": {
    "recovery": [
      {
        "title": "AA: P.P. Workshop Mon - Sat 6:45 AM",
        "subtitle": "Too Young To Die Mon & Wed 8 PM",
        "address": "8545 E Dry Creek Rd"
      },
      {
        "title": "AA: Grateful 2b here",
        "subtitle": "Thursday7:30 pm",
        "address": "8700 E 21st Ave"
      }
     ]
    }
   }
```



 ## Schema Design

 ![image](https://user-images.githubusercontent.com/49769068/72028374-8261d700-323f-11ea-83d0-813dbb00fd7b.png)


 ## Tech Stack List
   *  [Node.js](https://nodejs.org/en/)
   *  [Knex](http://knexjs.org/)
   *  [PostgreSQL](https://www.postgresql.org/)
   *  [GraphQL](https://graphql.org/)
   *  [Heroku](https://heroku.com/) -->

  ## Contributor Information

  ### [Joshua Sherwood](https://github.com/joshsherwood1)
   [View LinkedIn](https://www.linkedin.com/in/sherwoodjosh/)
