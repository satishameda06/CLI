const program = require('commander');
// Require logic.js file and extract controller functions using JS destructuring assignment
const { addTask, getTask, updateTask, deleteTask } = require('./mongoose');

program
  .version('0.0.1')
  .description('Task Board system');
//add task through the command line
program
  .command('prahem addtask <name>,<discription> <status>')
  .alias('a')
  .description('Add a task')
  .action((name, discription) => {
    addTask({ name, discription ,status });
  });
//get task 
program
  .command('prahem Gettask <name>')
  .alias('g')
  .description('Get task')
  .action(name => getTask(name));
// update task 
program
  .command('prahem updatetask <name> <description>')
  .alias('u')
  .discription('Update task')
  .action(name => updateTask(name, { name: name, description: description }));
// delete task
program
  .command('prahem deletetask <name>')
  .alias('d')
  .discription('Delete task')
  .action(name=>deleteTask(name));
program.parse(process.argv);










