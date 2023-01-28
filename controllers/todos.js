//require importing the data schema
const Todo = require('../models/Todo');
//exports the response methods to be used in other places
module.exports = {
  //GET response to find and display todo items
  getTodos: async (req,res)=>{
    //logs the user that is requesting the data in the console
    console.log(req.user);
    try{
      //find items in the database that are tied to the user
      const todoItems = await Todo.find({userId:req.user.id});
      //find uncompleted items in the database that are tied to the user
      const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false});
      //render the todo.ejs page and pass data into it to be used
      res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user});
    }catch(err){
      //catches and logs any errors in the console
      console.log(err);
    }
  },
  //POST response to create a new item
  createTodo: async (req, res)=>{
    try{
      //creates a new uncompleted item in the database that is tied to the user with input data from the entry form
      await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id});
      //logs a confirmation message in the console and redirects the user to the todo home route
      console.log('Todo has been added!');
      // refreshes the page
      res.redirect('/todos');
    }catch(err){
      //catches and logs any errors in the console
      console.log(err);
    }
  },
  //PUT response to mark an item as complete
  markComplete: async (req, res)=>{
    try{
      //updates an item as complete from incomplete according to input from another file
      await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
        // sets completed property to true
        completed: true
      });
      // logs "Marked Complete"
      console.log('Marked Complete');
      // response with "marked complete" as json
      res.json('Marked Complete');
    }catch(err){
      // logs the error
      console.log(err);
    }
  },
  // defines the markIncomplete function
  markIncomplete: async (req, res)=>{
    try{
      // finds a todo with the same id as in the request body and updates it
      await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
        // sets the completed property to false
        completed: false
      });
      // logs "marked incomplete"
      console.log('Marked Incomplete');
      // responds with "marked incomplete" as json
      res.json('Marked Incomplete');
    }catch(err){
      // logs the error
      console.log(err);
    }
  },
  // defines the deleteTodo function
  deleteTodo: async (req, res)=>{
    // logs the id of the todo that the request would like to delete
    console.log(req.body.todoIdFromJSFile);
    try{
      // finds a todo with the same id as in the request body and deletes it
      await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile});
      // logs deleted todo
      console.log('Deleted Todo');
      // responds with "Deleted it" as json
      res.json('Deleted It');
    }catch(err){
      // logs the error
      console.log(err);
    }
  }
};    