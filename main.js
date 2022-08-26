// Get elements from the DOM
const value = document.querySelector("#value"),
	increaseBtn = document.querySelector(".increase"),
	decreaseBtn = document.querySelector(".decrease"),
	normalButtons = document.querySelectorAll(".normal-btn"),
	autoButtons = document.querySelectorAll(".auto-btn"),
	speedButtons = document.querySelectorAll(".speed-btn");

// Set initial count to 0
let count = 0;

// Indicates wether an setInterval() function has started or not. Default is false
let intervalId;

/* When I click on a button to change the interval speed, 
this variable stores the name of the last interval that was running,
so the interval can be restarted with the new specified speed */
let isRunning;

/* Tracks counting speed. 
Default(Normal) => 1000 millisecond(1 second)
Fast => 100 milliseconds (0.1 seconds)
Slow => 2000 milliseconds (2 seconds) */
let speed = 1000;

// This controls the buttons for the manual controls
normalButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		// The button getting clicked
		let button = e.target;

		// This differentiates the buttons from one another by checking their classList
		if (button.classList.contains("decrease")) {
			count--;
		} else if (button.classList.contains("reset")) {
			count = 0;
		} else {
			count++;
		}

		// Changes the color of the element in the DOM depending of the value of the count variable
		if (count > 0) {
			value.style.color = "green";
		} else if (count < 0) {
			value.style.color = "red";
		} else {
			value.style.color = getComputedStyle(
				document.documentElement
			).getPropertyValue("--dark");
		}

		// Displays the value of the count variable in the DOM
		value.textContent = count;
	});
});

autoButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		// The button getting clicked
		let button = e.target;

		// This differentiates the buttons from one another by checking their classList
		if (button.classList.contains("auto-decrease")) {
			clickButton("decrease");
		} else if (button.classList.contains("stop")) {
			stopButtonClick();
		} else {
			clickButton("increase");
		}
	});
});

speedButtons.forEach((btn, index) => {
	btn.addEventListener("click", (e) => {
		// The button getting clicked
		let button = e.target;
		// This differentiates the buttons from one another by checking their classList
		if (button.classList.contains("fast")) {
			stopAndContinue(100);
			toggleActiveClass(button, index);
		} else if (button.classList.contains("slow")) {
			stopAndContinue(2000);
			toggleActiveClass(button, index);
		} else {
			stopAndContinue(1000);
			toggleActiveClass(button, index);
		}
	});
});

// Adds active class to rhe button clicked and removes it from other buttons
const toggleActiveClass = (btn, index) => {
	// Add active class to the button clicked
	btn.classList.toggle("active");

	// This is where we compare the index of the button clicked with all the other buttons in the list
	speedButtons.forEach((button, idx) => {
	/* The index of the button clicked is compared, 
	and if it doesn't match with any of them it removes the active class from it */
		if (index !== idx) {
			button.classList.remove("active");
			console.log(`Index of ${button.classList[2]} is ${idx}`);
		}
	});
};

/* This function clicks a manual button repeatedly. 
The value parameter is used to know what exact button should be clicked */
const clickButton = (value) => {
	// If no interval is running and the value is set to decrease then do this
	if (!intervalId && value === "decrease") {
		intervalId = setInterval(() => {
			decreaseBtn.click();
		}, speed);
		isRunning = "decrease";
	}

	// If no interval is running and the value is set to increase then do this
	else if (!intervalId && value === "increase") {
		intervalId = setInterval(() => {
			increaseBtn.click();
		}, speed);
		isRunning = "increase";
	}
};

/* This stops any interval that is currently running , 
and resets the intervalId back to a false value to indicate that it has stopped */
const stopButtonClick = () => {
	clearInterval(intervalId);
	intervalId = null;
};

/* This runs the interval that was running before a speed Button was clicked.
The function starts the interval again*/
const runLastClicked = () => {
	if (isRunning === "decrease") {
		clickButton("decrease");
	} else if (isRunning === "increase") {
		clickButton("increase");
	} else console.log("You haven't clicked on any button silly");
};

/* When a speed button is clicked it stops the current interval, 
changes it speed value and then starts the interval again */
const stopAndContinue = (value) => {
	stopButtonClick();
	speed = value;
	runLastClicked();
};
