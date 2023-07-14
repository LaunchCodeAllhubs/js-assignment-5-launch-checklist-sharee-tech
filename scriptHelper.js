// Write your helper functions here!
require("isomorphic-fetch");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  let destinationInfo = document.getElementById("missionTarget");
  destinationInfo.innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
  let numberInput = Number(testInput);
  if (testInput === "") {
    return "Empty";
  } else if (isNaN(numberInput)) {
    return "Not a Number";
  } else if (isNaN(numberInput) === false) {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let pilotStatus = document.querySelector("#pilotStatus");
  let copilotStatus = document.querySelector("#copilotStatus");
  let fuelStatus = document.querySelector("#fuelStatus");
  let cargoStatus = document.querySelector("#cargoStatus");

  if (
    validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoLevel) === "Empty"
  ) {
    alert("All fields are required!");
  } else if (
    validateInput(pilot) === "Is a Number" ||
    validateInput(copilot) === "Is a Number" ||
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoLevel) === "Not a Number"
  ) {
    alert("Please enter valid information for each field!");
  } else {
    //do you need this?
    list.style.visibility = "visible";
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    let launchStatus = document.getElementById("launchStatus");
    if (Number(fuelLevel) < 10000 && Number(cargoLevel) <= 10000) {
      fuelStatus.innerHTML = "Not enough fuel for the shuttle to launch";
      cargoStatus.innerHTML = "Cargo mass okay for launch";
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "#C7254E";
    } else if (Number(fuelLevel) >= 10000 && Number(cargoLevel) > 10000) {
      fuelStatus.innerHTML = "Fuel level okay for launch";
      cargoStatus.innerHTML = "Too much cargo mass for the shuttle to take off";
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "#C7254E";
    } else if (Number(fuelLevel) < 10000 && Number(cargoLevel) > 10000) {
      fuelStatus.innerHTML = "Not enough fuel for the shuttle to launch";
      cargoStatus.innerHTML = "Too much cargo mass for the shuttle to take off";
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "#C7254E";
    } else {
      fuelStatus.innerHTML = "Fuel level okay for launch";
      cargoStatus.innerHTML = "Cargo mass okay for launch";
      launchStatus.innerHTML = "Shuttle ready for launch";
      launchStatus.style.color = "#419F6A";
    }
  }
}

async function myFetch() {
  //add the URL and return response.json().
  let planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
