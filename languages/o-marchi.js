function random(min, max) {
	return Math.floor((Math.random() * (max - min + 1) + min));
}

function crappyWeather () {
	let conditions = [
		'sunny', 'rainy', 'cloudy', 'windy', 'stormy', 'snowy', 'foggy'
	];

	// get random condition
	return conditions[random(0, conditions.length - 1)];
}

function newsCast() {
	return `Hello, today will be a ${crappyWeather()} day out there!`;
}

newsCast();

