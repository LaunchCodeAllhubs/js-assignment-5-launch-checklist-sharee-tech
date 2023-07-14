window.addEventListener("load", function () {
  let listedPlanets;
  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse.then(function (result) {
    listedPlanets = result;
    let selectedPlanet = pickPlanet(listedPlanets);
    addDestinationInfo(
      document,
      selectedPlanet.name,
      selectedPlanet.diameter,
      selectedPlanet.star,
      selectedPlanet.distance,
      selectedPlanet.moons,
      selectedPlanet.image
    );
  });

  // Handle Faulty Items here
  let list = document.querySelector("#faultyItems");

  let form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let fuelLevel = document.querySelector('input[name="fuelLevel"]').value;
    let cargoLevel = document.querySelector('input[name="cargoMass"]').value;
    let pilot = document.querySelector('input[name="pilotName"]').value;
    let copilot = document.querySelector('input[name="copilotName"]').value;
    formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
  });
});
