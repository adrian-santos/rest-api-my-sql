'use strict';
const Hapi = require('hapi');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    username: 'root',
    password: 'adriansantos',
    database: 'employees'
  }
});

const server = Hapi.server({
  host: 'localhost',
  port: 1234
});

// Routes
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
