# Hapi, Knex, MySQL Boilerplate

---

Converting the employees MySQL DB into REST API Calls using Hapi and Knex

## Introduction

This is an MVP for a Hapi, Node, Knex and MySQL project. Feel free to use this to convert MySQL DB's into REST API's

## Instructions

Database

1. Download the employees DB from MySQL's suggested test DB here [https://github.com/datacharmer/test_db](https://github.com/datacharmer/test_db)

2. Open up a Terminal

3. Go the the project folder

```
cd ~/database-location
```

4. Activate MySQL into the Command Line

```
mysql -u root -p
```

5. Run the `employees.sql`

6. Open up your preferred Database Management and Test the Data if it loaded by:

```
SELECT * FROM table_name LIMIT 10;
```

Node Project

1. Clone this project

```
git clone https://github.com/adrian-santos/rest-api-my-sql.git
```

2. Install the Node Packages

```
npm install
```

3. Change the database credentials in `server.js` at `Line 5`

```
connection: {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'employees',
    charset: 'utf8'
  }
```

4. Start the Project

```
npm start
```

5. You can use the any API Tester that you have. I use [Postman](https://www.getpostman.com/)

6. Visit `localhost:1234/employees` in order to see 10 employees in the DB

7. Done :)

_Modify per your project needs_
