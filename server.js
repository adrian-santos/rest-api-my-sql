'use strict';
const Hapi = require('hapi');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees',
    charset: 'utf8'
  }
});

const server = Hapi.server({
  host: 'localhost',
  port: 1234
});

// Routes - Should be located inside the routes folder
server.route({
  method: 'GET',
  path: '/employees',
  handler: (request, h) => {
    return knex
      .select('*')
      .from('employees')
      .limit(10);
  }
});

server.route({
  method: 'POST',
  path: '/employees/post',
  handler: (request, h) => {
    return knex('employees').insert({
      emp_no: 123456,
      birth_date: '1993-10-31',
      first_name: 'Adrian',
      last_name: 'Santos',
      gender: 'M',
      hire_date: '2018-11-13'
    });
  }
});

const init = async () => {
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: true,
      logEvents: ['response', 'onPostStart']
    }
  });
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
