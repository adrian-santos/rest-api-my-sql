'use strict';
const Hapi = require('hapi');
const connection = require('./knexfile');
const knex = require('knex')(connection['development']);

const server = Hapi.server({
  host: 'localhost',
  port: 1234
});

// GET
server.route({
  method: 'GET',
  path: '/getEmployees',
  handler: (request, h) => {
    return knex('employees')
      .select('*')
      .limit(10)
      .catch(err => console.err(err));
  }
});

// POST
server.route({
  method: 'POST',
  path: '/addEmployee',
  handler: (request, h) => {
    const employee = request.payload;

    return knex('employees')
      .insert({
        emp_no: employee.emp_no,
        birth_date: employee.birth_date,
        first_name: employee.first_name,
        last_name: employee.last_name,
        gender: employee.gender,
        hire_date: employee.hire_date
      })
      .catch(err => console.error(err))
      .then(() => {
        return knex('employees')
          .select('*')
          .limit(10);
      })
      .catch(err => console.log(err));
  }
});

// PUT
server.route({
  method: 'PUT',
  path: '/updateEmployee',
  handler: (request, h) => {
    const employee = request.payload;
    const updateEmployee = knex('employees')
      .update({
        birth_date: employee.birth_date,
        first_name: employee.first_name,
        last_name: employee.last_name,
        gender: employee.gender,
        hire_date: employee.hire_date
      })
      .where('emp_no', employee.emp_no)
      .catch(err => console.error(err))
      .then(() => {
        return knex('employees')
          .select('*')
          .limit(10);
      })
      .catch(err => console.log(err));

    return updateEmployee;
  }
});

// DELETE
server.route({
  method: 'DELETE',
  path: '/deleteEmployee',
  handler: (request, h) => {
    const employee = request.payload;
    const deleteEmployee = knex('employees')
      .del()
      .where('emp_no', employee.emp_no)
      .catch(err => console.error(err))
      .then(() => {
        return knex('employees')
          .select('*')
          .limit(10);
      })
      .catch(err => console.log(err));

    return deleteEmployee;
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
