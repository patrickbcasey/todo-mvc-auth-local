//creates a deleteBtn variable out of elements with the class of .del
const deleteBtn = document.querySelectorAll('.del');
// add event listener to solved button
const solvedBtn = document.querySelectorAll('.spacedRep')
//Check answer button
const checkAns = document.querySelectorAll('.checkAns')

Array.from(checkAns).forEach((el) => {
  el.addEventListener('click', function() {
    this.previousSibling.previousSibling.classList.toggle('hidden')
  });
});

Array.from(solvedBtn).forEach((el) => {
  el.addEventListener('click', solvedAnki);
});
//adds an event listener to every deleteBtn variable
Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteAnki);
});

// //adds an event listener to every ankiComplete variable (completed items)
// Array.from(ankiComplete).forEach((el) => {
//   el.addEventListener('click', markIncomplete);
// });
//async function to make a DELETE request and remove an item
async function deleteAnki() {
  //creates a ankiId variable and assigns the unique ID of the item to it
  const ankiId = this.parentNode.dataset.id;
  try {
    //makes a fetch request on the ankis/deleteAnki route
    const response = await fetch('ankis/deleteAnki', {
      //makes the request type DELETE
      method: 'delete',
      //sends the header saying that the data is in json format
      headers: { 'Content-type': 'application/json' },
      //makes the request.body into json
      body: JSON.stringify({
        //puts ankiId variable into the request body as ankiIdFromJSFile to be passed
        'ankiIdFromJSFile': ankiId
      })
    });
    //waits for and gets data response
    const data = await response.json();
    //logs response data to the console
    console.log(data);
    //refreshes the page
    location.reload();
  } catch (err) {
    //catches and logs any errors to the console
    console.log(err);
  }
}

async function solvedAnki() {
  //creates a ankiId variable and assigns the unique ID of the item to it
  const ankiId = this.parentNode.dataset.id;
  try {
    // fetch request on the ankis/solvedAnki route
    const response = await fetch('ankis/solvedAnki', {
      // update request type
      method: 'put',
      // with a header indicating its JSON data
      headers: { 'Content-type': 'application/json' },
      // turn the body into a JSON string
      body: JSON.stringify({
        // Send the object with its id
        'ankiIdFromJSFile': ankiId
      })
    });
    // saves the response as json
    const data = await response.json();
    // logs json
    console.log(data);
    // refresh
    location.reload();
  } catch (err) {
    // logs an error
    console.log(err);
  }
}