// Planet Class
class Planet {
    constructor(name, posY) {
      this.name = name;
      this.pos = createVector(posY);
      this.colour = changeColour();
      this.angle = 0;
      this.years = [0]
      this.yearsDisplay = document.getElementById("years")
    }
    
    draw() {
      let orbitSpeed = 0;
      
      translate(rotCenterX_Sun, rotCenterY_Sun);
        rotate(-this.angle);
        noStroke();
        fill(changeColour());
        ellipse(orbitRadius(), this.pos.y, this.diameter);
  
      // Updated here
      // Set orbit speed using function to calculate velocity
      orbitSpeed = calcVelocity() * speedAdjust();
      this.angle += orbitSpeed;
      
      // Update the velocity info in corner
      updateVelocity(calcVelocity());
      
      // Set diameter of planet based on mass --- need to make mathmatical function
      this.diameter = planetDiameter() * 2;   // Multiply by two otherwise is too small
  
      // Count how many times a full orbit has been complete
      if ((Math.round(this.angle)) % 360 == 0){
        years.innerHTML = "(Not currently working) Years: " + (numYears[0] += 1)
      }
  
      // Change scale as you zoom in and out
      const scale = document.getElementById("scale");
      scale.innerHTML = "Scale: 1 pixel = " + Math.round(changeScale()) + " Km"
  
    }
      
      static orbit() {
        noFill();
        strokeWeight(1.5);
        stroke(255);
        ellipse(0, 0, orbitRadius()*2);  // Multiply by two because we have the radius and we need the diameter
        
      }
    }
  
// Orbit number variable
const years = document.getElementById("years");
var numYears = [-7]

// Required Mathmatical Constants
const pi = 3.142
const gravConstant = 6.67 * Math.pow(10, -11)
const sunRatio = 1.888837741 * Math.pow(10, 11)

// Function to return new colour
function changeColour(){
const colour = document.getElementById("colour");
return colour.value;
}

// Function to calculate velocity based on orbit radius and central body mass
function calcVelocity(){
const radius = document.getElementById("radius");
const centralMass = document.getElementById("centralMass");
var velocity;

// This uses the equation v^2 = GM/r to calculate the velocity
velocity = (Math.sqrt((gravConstant * (centralMass.value * sunRatio) / radius.value)))/6.053067993;
return velocity;
}

// Function to update velocity info text
function updateVelocity(velocity){
const velocityInfo = document.getElementById("velocity");

velocityInfo.innerHTML = "Velocity: " + Math.round(velocity*1585856.256) + " Km/h";
}

// Set up planet
// Objects - Planets:
let earth;
let rotCenterX_Sun, rotCenterY_Sun = 0;

function setup() {
canvas = createCanvas(1580, 940);
angleMode(DEGREES);

// Move the canvas so it’s inside our parent container
canvas.parent('orbitContainer');

// Planets of the Solar System:
//(name, orbit radius, #)
earth = new Planet("Earth", 0);
}

function draw() {
background("black");

// We draw and set the SUN:
rotCenterX_Sun = width/2;
rotCenterY_Sun = height/2;

push();

const centralDiameter = document.getElementById("centralMassRadius")
translate(rotCenterX_Sun, rotCenterY_Sun);
fill("#f6c50b");
let sun = ellipse(0, 0, centralDiameter.value * sunDiameter(), centralDiameter.value * sunDiameter());   //uses the radius of the sun as the diameter value due to it being a 5:1 scale
pop();

// We draw and make orbit EARTH:
push();
earth.draw();
Planet.orbit();
pop();
}

// Dropdown button functions
// Creating variables for each button
const dropdown = document.getElementById("dropdown")
const mercuryButton = document.getElementById("mercury");
const venusButton = document.getElementById("venus");
const earthButton = document.getElementById("earth");
const marsButton = document.getElementById("mars");
const jupiterButton = document.getElementById("jupiter");

// Input field variables
const diameter = document.getElementById("planetMass")
const radius = document.getElementById("radius")
const colour = document.getElementById("colour")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Adding event listeners so when button clicked function is complete
// Event listener and function for Mercury
mercuryButton.addEventListener("click", function(){
const bodyType = document.getElementById("bodyType")
const planets = [venusButton, earthButton, marsButton, jupiterButton]
dropdown.innerHTML = "Mercury";
if (mercuryButton.className == "dropdown-item") {
    mercuryButton.className = "dropdown-item active";
}

for (let planet in planets) {
    if (planets[planet].className == "dropdown-item active") {
    planets[planet].className = "dropdown-item";
    }
}

var request = new XMLHttpRequest();
    request.open('GET', 'https://api.le-systeme-solaire.net/rest/bodies/mercury');
    request.responseType = "json"
    request.send();
    request.onload = function() {
    radius.value = (request.response.semimajorAxis)/1000000     // divide by 1000000 to get correct scale
    diameter.value = ((request.response.meanRadius) * 2)/1000   // multiply by 2 to get diameter and divide by 1000 to get correct scale
    bodyType.innerHTML = "Body Type: " + request.response.bodyType
};

colour.value = "#888683"

});

// Event listener and function for Venus
venusButton.addEventListener("click", function(){
const bodyType = document.getElementById("bodyType")
const planets = [mercuryButton, earthButton, marsButton, jupiterButton]
dropdown.innerHTML = "Venus";
if (venusButton.className == "dropdown-item") {
    venusButton.className = "dropdown-item active";
}

for (let planet in planets) {
    if (planets[planet].className == "dropdown-item active") {
    planets[planet].className = "dropdown-item";
    }
}

var request = new XMLHttpRequest();
    request.open('GET', 'https://api.le-systeme-solaire.net/rest/bodies/venus');
    request.responseType = "json"
    request.send();
    request.onload = function() {
    radius.value = (request.response.semimajorAxis)/1000000     // divide by 1000000 to get correct scale
    diameter.value = ((request.response.meanRadius) * 2)/1000   // multiply by 2 to get diameter and divide by 1000 to get correct scale
    bodyType.innerHTML = "Body Type: " + request.response.bodyType
};

colour.value = "#f7b85e"

});

// Event listener and function for Earth
earthButton.addEventListener("click", function(){
const bodyType = document.getElementById("bodyType")
const planets = [mercuryButton, venusButton, marsButton, jupiterButton]
dropdown.innerHTML = "Earth (default)";
if (earthButton.className == "dropdown-item") {
    earthButton.className = "dropdown-item active";
}

for (let planet in planets) {
    if (planets[planet].className == "dropdown-item active") {
    planets[planet].className = "dropdown-item";
    }
}

// API request to get required data from Earth
var request = new XMLHttpRequest();
request.open('GET', 'https://api.le-systeme-solaire.net/rest/bodies/earth');
request.responseType = "json"
request.send();
request.onload = function() {
    radius.value = (request.response.semimajorAxis)/1000000     // divide by 1000000 to get correct scale
    diameter.value = ((request.response.meanRadius) * 2)/1000   // multiply by 2 to get diameter and divide by 1000 to get correct scale
    bodyType.innerHTML = "Body Type: " + request.response.bodyType
};

colour.value = "#0060fa"

});

// Event listener and function for Mars
marsButton.addEventListener("click", function(){
const bodyType = document.getElementById("bodyType")
const planets = [mercuryButton, venusButton, earthButton, jupiterButton]
dropdown.innerHTML = "Mars";
if (marsButton.className == "dropdown-item") {
    marsButton.className = "dropdown-item active";
}

for (let planet in planets) {
    if (planets[planet].className == "dropdown-item active") {
    planets[planet].className = "dropdown-item";
    }
}

var request = new XMLHttpRequest();
    request.open('GET', 'https://api.le-systeme-solaire.net/rest/bodies/mars');
    request.responseType = "json"
    request.send();
    request.onload = function() {
    radius.value = (request.response.semimajorAxis)/1000000     // divide by 1000000 to get correct scale
    diameter.value = ((request.response.meanRadius) * 2)/1000   // multiply by 2 to get diameter and divide by 1000 to get correct scale
    bodyType.innerHTML = "Body Type: " + request.response.bodyType
};  

colour.value = "#ff4000"

});

// Event listener and function for Jupiter
jupiterButton.addEventListener("click", function(){
const bodyType = document.getElementById("bodyType")
const planets = [mercuryButton, venusButton, earthButton, marsButton]
dropdown.innerHTML = "Jupiter";
if (jupiterButton.className == "dropdown-item") {
    jupiterButton.className = "dropdown-item active";
}

for (let planet in planets) {
    if (planets[planet].className == "dropdown-item active") {
    planets[planet].className = "dropdown-item";
    }
}

var request = new XMLHttpRequest();
    request.open('GET', 'https://api.le-systeme-solaire.net/rest/bodies/jupiter');
    request.responseType = "json"
    request.send();
    request.onload = function() {
    radius.value = (request.response.semimajorAxis)/1000000     // divide by 1000000 to get correct scale
    diameter.value = ((request.response.meanRadius) * 2)/1000   // multiply by 2 to get diameter and divide by 1000 to get correct scale
    bodyType.innerHTML = "Body Type: " + request.response.bodyType
};

colour.value = "#eec194"

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Zoom Fucntions
// Button Click Functions

const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");
const reset = document.getElementById("reset")

// Zoom in button
zoomIn.addEventListener("click", function(){
const zoomValue = document.getElementById("zoomValue");
// If the zoom value is less than 10% increase in increments of 1%
if (parseInt(zoomValue.innerHTML) < 10){
    zoomValue.innerHTML = (parseInt(zoomValue.innerHTML) + 1) + "%"
} else{
    zoomValue.innerHTML = (parseInt(zoomValue.innerHTML) + 10) + "%"
}
})

// Zoom out button
zoomOut.addEventListener("click", function(){
const zoomValue = document.getElementById("zoomValue");
// Make sure you cant zoom out less than 1 and if below 10% zoom out by 1% each time
if (parseInt(zoomValue.innerHTML) == 1){
    zoomValue.innerHTML = "1%"
}else if (parseInt(zoomValue.innerHTML) <= 10){
    zoomValue.innerHTML = (parseInt(zoomValue.innerHTML) - 1) + "%"
}else{
    zoomValue.innerHTML = (parseInt(zoomValue.innerHTML) - 10) + "%"
}
})

// Reset button
reset.addEventListener("click", function(){
const zoomValue = document.getElementById("zoomValue");
zoomValue.innerHTML = 100 + "%"
})

// Functions to get zoom value and calulate new sizes
// Orbit radius function
function orbitRadius(){
const zoomValue = parseInt(document.getElementById("zoomValue").innerHTML, 10);
const radius = document.getElementById("radius").value
percent = zoomValue / 100

return radius * percent
}

// Planet diameter function
function planetDiameter(){
const zoomValue = parseInt(document.getElementById("zoomValue").innerHTML, 10);
const diameter = document.getElementById("planetMass").value
percent = zoomValue / 100

return diameter * percent
}

// Sun diameter function
function sunDiameter(){
const zoomValue = parseInt(document.getElementById("zoomValue").innerHTML, 10);
percent = zoomValue / 100

return percent
}

// Change scale function
function changeScale(){
const zoomValue = parseInt(document.getElementById("zoomValue").innerHTML, 10);
percent = zoomValue / 100;

return 1000000 / percent
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions to change speed
// Required Variables
const speedIncrease = document.getElementById("speedIncrease");
const speedDecrease = document.getElementById("speedDecrease");
const speedReset = document.getElementById("speedReset");

// Speed Increase button
speedIncrease.addEventListener("click", function(){
  const speedValue = document.getElementById("speedValue")
  speedValue.innerHTML ++;
})

// Speed Decrease button
speedDecrease.addEventListener("click", function(){
  const speedValue = document.getElementById("speedValue");
  // If the value is already 1 can't decrease anymore
  if (speedValue.innerHTML == 1){
    speedValue.innerHTML = 1;
  } else{
    speedValue.innerHTML --;
  }
})

// Reset button fucntion
speedReset.addEventListener("click", function(){
  const speedValue = document.getElementById("speedValue");
  speedValue.innerHTML = 1
})

// Fucntion to get speed value and return it to speed up and slow down animation
function speedAdjust(){
  const speedValue = parseInt(document.getElementById("speedValue").innerHTML, 10);
  return speedValue
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fucntions for searching for planets
// Search button variable
const searchButton = document.getElementById("searchButton")

searchButton.addEventListener("click", function(){
const planetValue = document.getElementById("search").value
const bodyType = document.getElementById("bodyType")

// Check validity of search box
// If box is empty send alert saying to enter a value
if (planetValue == "") {
    alert("Please enter a value.")
} 
// If box isn't empty carry on with API call
else{
    var request = new XMLHttpRequest();
    request.open('GET', "https://api.le-systeme-solaire.net/rest/bodies/" + planetValue);
    request.responseType = "json"
    request.send();
    request.onload = function() {
        // If the requested page doens't exist e.g. unknown input send alert saying unknown input
        if (request.status == 404){
        alert("Body not found.\nMake sure you entered it correctly.\nIt also may not be in our database.")
        } 
        // If page does exist e.g. known input carry on as normal
        else{
        radius.value = (request.response.semimajorAxis)/1000000     // divide by 1000000 to get correct scale
        diameter.value = ((request.response.meanRadius) * 2)/1000   // multiply by 2 to get diameter and divide by 1000 to get correct scale
        bodyType.innerHTML = "Body Type: " + request.response.bodyType
        // Displays the new searched planet as the title of the dropdown and makes all other planets unactive
        dropdown.innerHTML = planetValue.charAt(0).toUpperCase() + planetValue.slice(1).toLowerCase();    //display string in dropwdown with correct capitalisation
        planets = [mercuryButton, venusButton, earthButton, marsButton, jupiterButton]
        for (let planet in planets) {
            if (planets[planet].className == "dropdown-item active") {
            planets[planet].className = "dropdown-item";
            }
        }
        if (request.response.bodyType == "Moon"){
            const zoomValue = document.getElementById("zoomValue");
            zoomValue.innerHTML = "100000%"
            diameter.value = ((request.response.meanRadius) * 2)/100000
        }
        }
    };
}
    


})


// Functions and everything needed to change the central body

// Dropdown button functions
// Creating variables for each button
const centralDropdown = document.getElementById("centralDropdown")
const sunButton = document.getElementById("sun");
const earthCentralButton = document.getElementById("earthCentral");
const marsCentralButton = document.getElementById("marsCentral");


// Input field variables
const centralMass = document.getElementById("centralMass")
const centralRadius = document.getElementById("centralMassRadius")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Adding event listeners so when button clicked function is complete
// Event listener and function for Sun
sunButton.addEventListener("click", function(){
const bodies = [earthCentralButton, marsCentralButton]
centralDropdown.innerHTML = "Sun (default)";
if (sunButton.className == "dropdown-item") {
    sunButton.className = "dropdown-item active";
}

for (let body in bodies) {
    if (bodies[body].className == "dropdown-item active") {
    bodies[body].className = "dropdown-item";
    }
}

var request = new XMLHttpRequest();
    request.open('GET', 'https://api.le-systeme-solaire.net/rest/bodies/sun');
    request.responseType = "json"
    request.send();
    request.onload = function() {
    console.log(request.response.mass.massValue)
    centralMass.value = request.response.mass.massValue
    centralRadius.value = request.response.meanRadius / 100000
};
});

// Event listener and function for Earth Central
earthCentralButton.addEventListener("click", function(){
const bodies = [sunButton, marsCentralButton]
centralDropdown.innerHTML = "Earth";
if (earthCentralButton.className == "dropdown-item") {
    earthCentralButton.className = "dropdown-item active";
}

for (let body in bodies) {
    if (bodies[body].className == "dropdown-item active") {
    bodies[body].className = "dropdown-item";
    }
}

var request = new XMLHttpRequest();
    request.open('GET', 'https://api.le-systeme-solaire.net/rest/bodies/earth');
    request.responseType = "json"
    request.send();
    request.onload = function() {
    var sf = 30 - request.response.mass.massExponent
    console.log(request.response.mass.massValue)
    console.log(sf)
    centralMass.value = (request.response.mass.massValue) * Math.pow(10, -sf)
    centralRadius.value = request.response.meanRadius / 100000
};
});

// Event listener and function for Mars Central
marsCentralButton.addEventListener("click", function(){
const bodies = [sunButton, earthCentralButton]
centralDropdown.innerHTML = "Mars";
if (marsCentralButton.className == "dropdown-item") {
    marsCentralButton.className = "dropdown-item active";
}

for (let body in bodies) {
    if (bodies[body].className == "dropdown-item active") {
    bodies[body].className = "dropdown-item";
    }
}

var request = new XMLHttpRequest();
    request.open('GET', 'https://api.le-systeme-solaire.net/rest/bodies/mars');
    request.responseType = "json"
    request.send();
    request.onload = function() {
    var sf = 30 - request.response.mass.massExponent
    console.log(request.response.mass.massValue)
    console.log(sf)
    centralMass.value = (request.response.mass.massValue) * Math.pow(10, -sf)
    centralRadius.value = request.response.meanRadius / 100000
};
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                                                                   