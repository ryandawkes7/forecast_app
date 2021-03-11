// Get the form & input via querySelector
const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#message_one");
const messageTwo = document.querySelector("#message_two");

// Setup an eventListener to listen out for when the form is submitted. Everytime it is submitted, the callback function is executed
weatherForm.addEventListener("submit", (e) => {
  // Prevent form default action - stop page refresh on submit. This allows any code below to be successfully executed with no interruption
  e.preventDefault();

  // Get the search input value
  const location = searchInput.value;

  messageOne.textContent = "Loading data...";
  messageTwo.textContent = "";

  // Use 'fetch()' on self-created API to retrieve weather data for the location the user enters
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    // Async JSON data retreival and parsing
    res.json().then((data) => {
      // Error handling for no errors in data retreival
      if (data.error) {
        // Print error message to UI
        messageOne.textContent = `Error - ${data.error}`;
      } else {
        // If successfully retreived data, print response data to UI
        messageOne.textContent = `${data.location}`;
        messageTwo.textContent = `${data.forecast}`;
      }
    });
  });
});
