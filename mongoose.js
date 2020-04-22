const mongoose = require('mongoose'); // An Object-Document Mapper for Node.js
const assert = require('assert'); // N.B: Assert module comes bundled with Node.js.
mongoose.Promise = global.Promise; // Allows us to use Native promises without throwing error.

// Connect to a single MongoDB instance. The connection string could be that of a remote server
// We assign the connection instance to a constant to be used later in closing the connection
const db = mongoose.connect('mongodb://localhost:27017/Task-manager');

// Converts value to lowercase
function toLower(v) {
  return v.toLowerCase();
}

// Define a Task Schema
const taskSchema = mongoose.Schema({
  firstname: { type: String, set: toLower },
  lastname: { type: String, set: toLower },
  phone: { type: String, set: toLower },
  email: { type: String, set: toLower }
});

// Define model as an interface with the database
const Task = mongoose.model('taskboard', taskSchema);

/**
 * @function  [addTask]
 * @returns {String} Status
 */
const addTask = (task) => {
  Task.create(task, (err) => {
 
    console.info('New Task added');
    db.disconnect();
  });
};

/**
 * @function  [getTask]
 * @returns {Json} Tasks
 */
const getTask = (name) => {
  // Define search criteria. The search here is case-insensitive and inexact.
  const search = new RegExp(name, 'i');
  Task.find({$or: [{name: search }]})
  .exec((err, Task) => {
    
    console.info(Task);
    console.info(`${Task.length} matches`);
    db.disconnect();
  });
};

//update task

const updateTask = (name,payload) => {
    
    Task.updateOne({name:name},{$set:payload})
    .exec((err, Task) => {
      
      console.info(Task);
      console.info(`${Task.length} matches`);
      db.disconnect();
    });
  };
const deleteTask=(name)=>{
    Task.deleteOne({name:name}).exec((err,task)=>{

    })
}
// Export all methods
module.exports = {  addTask, getTask ,updateTask,deleteTask};
    