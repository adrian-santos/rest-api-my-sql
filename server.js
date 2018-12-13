'use strict';
const Hapi = require('hapi');
const connection = require('./knexfile');
const knex = require('knex')(connection['development']);

const server = Hapi.server({
  host: 'localhost',
  port: 1234
});

// Routes - Should be located inside the routes folder
server.route({
  method: 'GET',
  path: '/employees',
  handler: () => {
    return knex
      .select('*')
      .from('employees')
      .limit(10);
  }
});

server.route({
  method: 'POST',
  path: '/addEmployee',
  handler: (request, h) => {
    const employee = request.payload;

    const insertEmployee = knex
      .insert({
        emp_no: employee.emp_no,
        birth_date: employee.birth_date,
        first_name: employee.first_name,
        last_name: employee.last_name,
        gender: employee.gender,
        hire_date: employee.hire_date
      })
      .into('employees')
      .catch(err => console.error(err));
  }
});

server.route({
  method: 'DELETE',
  path: '/deleteEmployee',
  handler: (request, h) => {
    const employee = request.payload;

    console.log(employee.emp_no);
    const deleteEmployee = knex('employees')
      .where('emp_no', employee.emp_no)
      .del()
      .catch(err => console.error(err));
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
