//creates a deleteBtn variable out of elements with the class of .del
const deleteBtn = document.querySelectorAll('.del');
//creates a todoItem variable out of spans with the .not class
const todoItem = document.querySelectorAll('span.not');
//creates a todoComplete variable out of spans with the .completed class
const todoComplete = document.querySelectorAll('span.completed');
//adds an event listener to every deleteBtn variable
Array.from(deleteBtn).forEach((el)=>{
  el.addEventListener('click', deleteTodo);
});
//adds an event listener to every todoItem variable (uncompleted items)
Array.from(todoItem).forEach((el)=>{
  el.addEventListener('click', markComplete);
});
//adds an event listener to every todoComplete variable (completed items)
Array.from(todoComplete).forEach((el)=>{
  el.addEventListener('click', markIncomplete);
});
//async function to make a DELETE request and remove an item
async function deleteTodo(){
  //creates a todoId variable and assigns the unique ID of the item to it
  const todoId = this.parentNode.dataset.id;
  try{
    //makes a fetch request on the todos/deleteTodo route
    const response = await fetch('todos/deleteTodo', {
      //makes the request type DELETE
      method: 'delete',
      //sends the header saying that the data is in json format
      headers: {'Content-type': 'application/json'},
      //makes the request.body into json
      body: JSON.stringify({
        //puts todoId variable into the request body as todoIdFromJSFile to be passed
        'todoIdFromJSFile': todoId
      })
    });
    //waits for and gets data response
    const data = await response.json();
    //logs response data to the console
    console.log(data);
    //refreshes the page
    location.reload();
  }catch(err){
    //catches and logs any errors to the console
    console.log(err);
  }
}
//async function to make a PUT request and update an item as complete
async function markComplete(){
  //creates a todoId variable and assigns the unique ID of the item to it
  const todoId = this.parentNode.dataset.id;
  try{
    //makes a fetch request on the todos/markComplete route
    const response = await fetch('todos/markComplete', {
      //makes the request type PUT
      method: 'put',
      //sends the header saying the data is in json format
      headers: {'Content-type': 'application/json'},
      //makes the request.body into json
      body: JSON.stringify({
        //puts todoId variable into the request body as todoIdFromJSFile to be passed
        'todoIdFromJSFile': todoId
      })
    });
    //waits for and gets data response
    const data = await response.json();
    //logs response data to the console
    console.log(data);
    //refreshes the page
    location.reload();
  }catch(err){
    //catches and logs any errors to the console
    console.log(err);
  }
}
//async function to make a PUT request and update an item as incomplete
async function markIncomplete(){
  //creates a todoId variable and assigns the unique ID of the item to it
  const todoId = this.parentNode.dataset.id;
  try{
    // fetch request on the todos/markIncomplete route
    const response = await fetch('todos/markIncomplete', {
      // update request type
      method: 'put',
      // with a header indicating its JSON data
      headers: {'Content-type': 'application/json'},
      // turn the body into a JSON string
      body: JSON.stringify({
        // Send the object with its id
        'todoIdFromJSFile': todoId
      })
    });
    // saves the response as json
    const data = await response.json();
    // logs json
    console.log(data);
    // refresh
    location.reload();
  }catch(err){
    // logs an error
    console.log(err);
  }
}