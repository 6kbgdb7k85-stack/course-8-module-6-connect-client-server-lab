events = [];

function getEvents() {
  fetch("http://localhost:5000/events")
    .then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        throw Error(`Request failed with status ${r.status}`);
      }
    })
    .then((data) => {
      list = document.querySelector("#event-list");
      events = data;
      list.innerHTML = events
        .map((event) => {
          return `<li key={${event.id}}>${event.title}</li>`;
        })
        .join("");
    })
    .catch((error) => console.error(error));
}

function addEvent(e) {
  e.preventDefault();
  const formData = {};
  Object.keys(e.target.elements).forEach((inputKey) => {
    input = e.target.elements[inputKey];
    if (input.type !== "submit") {
      formData[input.id] = input.value;
    }
  });
  if (!formData.title) {
    console.error("Field 'title' is required");
  } else {
    fetch("http://localhost:5000/events", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          console.log(r);
        }
      })
      .then((data) => {
        list = document.querySelector("#event-list");
        events.push(data);
        list.innerHTML = events
          .map((event) => {
            return `<li key={${event.id}}>${event.title}</li>`;
          })
          .join("");
      });
  }
}

document.querySelector("form").addEventListener("submit", addEvent);

getEvents();
