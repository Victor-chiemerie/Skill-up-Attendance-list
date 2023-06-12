// JavaScript code for the attendance list

// Get the table and form elements
const attendanceTable = document.getElementById("attendanceTable");
const attendanceForm = document.getElementById("attendanceForm");
const nameInput = document.getElementById("nameInput");
const formSection = document.getElementById("attendanceFormSection");
const listSection = document.getElementById("attendanceListSection");
const main = document.querySelector("main")

// Get the navigation links
const formNavLink = document.querySelector('a[href="#attendanceFormSection"]');
const listNavLink = document.querySelector('a[href="#attendanceListSection"]');

// Function to save the attendee's data to local storage
const saveAttendee = (name, date) => {
  // Check if there are existing attendees in local storage
  let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

  // Create a new attendee object
  const attendee = {
    name,
    date,
  };

  // Add the new attendee to the list
  attendees.push(attendee);

  // Save the updated attendee list to local storage
  localStorage.setItem("attendees", JSON.stringify(attendees));
}

const attendanceByDate = {}
  let attendees = JSON.parse(localStorage.getItem("attendees")) || [];
  attendees.forEach((attendee) => {
      if (attendanceByDate.hasOwnProperty(attendee.date)) {
          attendanceByDate[attendee.date].push(attendee.name);
      } else {
          attendanceByDate[attendee.date] = [attendee.name];
      }
});

// Display attendance list from local storage to the UI
const displayAttendance = () => {
  for (const key in attendanceByDate) {
    const list = document.createElement('div');
    list.classList.add('list');
    list.innerHTML = `
        <h1>${key}</h1>
        <ul id="date${key}">
        </ul>
    `;
    main.appendChild(list);

    const tools = document.getElementById(`date${key}`);
    let people = '';

    attendanceByDate[key].forEach((value) => {
      people += `<li>${value}</li>`;
    });
    tools.innerHTML = people;
  }
}

// Function to add a new attendee to the list
const addAttendee = (event) => {
  event.preventDefault();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const day = currentDate.getDate();
  const formattedDate = `${day}/${month}/${year}`;
  const name = nameInput.value;
  const date = formattedDate;

  // Save the attendee's data to local storage
  saveAttendee(name, date);

  // Display the saved attendance
  displayAttendance();

  // refresh the page
  location.reload();

  // Clear the input fields
  nameInput.value = "";
}

// Add an event listener to the form submission
attendanceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addAttendee(event);

});

// Add event listeners to the navigation links
formNavLink.addEventListener("click", (event) => {
  event.preventDefault();
  formSection.classList.remove("hidden");
  listSection.classList.add("hidden");
});

listNavLink.addEventListener("click", (event) => {
  event.preventDefault();
  formSection.classList.add("hidden");
  listSection.classList.remove("hidden");
});

displayAttendance();

console.log(attendanceByDate);