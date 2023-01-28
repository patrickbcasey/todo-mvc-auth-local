//module imports
// require importing express to be used in the program
const express = require('express');
//creates a router object that handles the routes
const router = express.Router();
//importing a controller folder to todosController to use its methods
const todosController = require('../controllers/todos'); 
//imports authentication middleware, allows users only
const { ensureAuth } = require('../middleware/auth');

//GET response for the home route of todos, redirects to todos controller, finds and displays todo and completed items for the user
router.get('/', ensureAuth, todosController.getTodos);
//POST response for the createTodo route, redirects to todos controller, creates a new todo item for the user and takes you back to the todos home route
router.post('/createTodo', todosController.createTodo);
//PUT response for the markComplete route, redirects to todos controller, updates an item as completed
router.put('/markComplete', todosController.markComplete);
//PUT response for the markIncomplete route, redirects to todos controller, updates an item as uncompleted
router.put('/markIncomplete', todosController.markIncomplete);
//DELETE response for the deleteTodo route, redirects to todos controller, removes an item from the database for the user
router.delete('/deleteTodo', todosController.deleteTodo);

//exports router object to be used in other places
module.exports = router;