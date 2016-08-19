
Storage.prototype.setObject = function(key, value) {
	this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
	var value = this.getItem(key);
	return value && JSON.parse(value);
}

Storage.prototype.removeObject = function(key) {
	this.removeItem(key);
}

/** --------------------------------------------
 * Globals
 -------------------------------------------- */

// grid size
g = 20;
grid = [];

// background
background = document.getElementById('background');
backgroundCtx = background.getContext('2d');

background.width = ww = window.innerWidth;
background.height = wh = window.innerHeight;

// get element and context
canvas = document.getElementById('c');
c = canvas.getContext('2d');

// set size
canvas.width = w = 600;
canvas.height = h = 400;

// game elements
objects = localStorage.getObject('SweetHome') || [];
currentObject = 'table';
buttons = [];

/** --------------------------------------------
 * Functions
 * ------------------------------------------ */

function rand(min, max) {
	return ~~(Math.random() * (max - min + 1) + min);
}

function randomNoise() {

    x = 0;
    y = 0;

    width = w;
    height = h;
    alpha = 90;

    var imageData = c.getImageData(x, y, width, height),
        pixels = imageData.data,
        n = pixels.length,
        i = 0;

    while (i < n) {
        pixels[i++] = pixels[i++] = pixels[i++] = (Math.random() * 256) | 0;
        pixels[i++] = alpha;
    }

    c.putImageData(imageData, x, y);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF',
    	color = '#';

    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function fillGrid() {

	for (var i = 0; i < w / g; i++) {
		for (var j = 0; j < h / g; j++) {

			grid.push({
				x: i,
				y: j,
				hover: false,
				used: false
			});
		}
	}
}

function drawGrid() {

	c.fillStyle = 'hsla(190, 40%, 50%, .5)'; // light blue
	c.lineWidth = 0.5;

	grid.forEach(function(square) {
		c.strokeStyle = 'hsla(0, 0%, 1%, 0.1)'; // black with low opacity
		c.strokeRect(g * square.x, g * square.y, g, g);

		if (square.hover) {
			c.strokeStyle = 'hsla(214, 44%, 30%, 1)'; // light blue
			c.strokeRect(g * square.x, g * square.y, g, g);
			c.fillRect(g * square.x, g * square.y, g, g);
		}
	});
};

function drawObject(object, x, y) {

	var obj = objectsType[object];

	if (!obj) {
		return;
	}

	obj.art.forEach(function(color, position) {

		c.fillStyle = obj.colors[color];

		c.fillRect(
			(y * g) + ~~(position % obj.width),
			(x * g) + ~~(position / obj.width) - obj.height,
			1, 1);
	});
}

function drawObjectBackground(object, x, y) {

	var obj = objectsType[object];

	if (!obj) {
		return;
	}

	obj.art.forEach(function(color, position) {

		backgroundCtx.fillStyle = obj.colors[color];

		backgroundCtx.fillRect(
			y + ~~(position % obj.width),
			x + ~~(position / obj.width),
			1, 1);
	});
}

function drawRoom(x, y, w, h) {

	c.fillStyle = '#ccc'; // light grey
	c.strokeStyle = '#000'; // black
	c.lineWidth = 2;

	c.fillRect(x * g, y * g, w * g, h * g);
	c.strokeRect(x * g, y * g, w * g, h * g);
}

function getGrid(x, y) {

	var currentGrid;

	grid.map(function(square) {

		if (square.x === x && square.y === y) {
			currentGrid = square;
		}
	});

	return currentGrid;
}

function getMouseGrid(event) {
	var rect = canvas.getBoundingClientRect(),
		x = event.clientX - rect.left,
		y = event.clientY - rect.top;

	return getGrid(~~(x / g), ~~(y / g));
}

function hover(e) {
	grid.forEach(function(square) {
		square.hover = false;
	});

	var mouseSquare = getMouseGrid(e);

	if (mouseSquare) {
		mouseSquare.hover = true;
	}
}

function click(e) {
	var square = getMouseGrid(e);
	newObject(currentObject, square.x, square.y);
}

function newObject(type, x, y) {

	objects.push({
		type: type,
		x: x,
		y: y
	});
}

function drawObjects() {

	objects.sort(function(a, b) {
		return a.y - b.y;
	});

	objects.forEach(function(object) {
		drawObject(object.type, object.y, object.x);
	});
}

function changeObject(object) {
	console.log(object);
	currentObject = object;
}

function createObjectsButtons() {

	for (var obj in objectsType) {
		var i = buttons.length;

		var x = (i * 90) + 30;

		buttons.push({
			hover: false,
			obj: obj,
			x: x,
			y: 20,
			w: 70,
			h: 70
		});
	}
}

function createMenuButtons() {

	buttons.push({
		hover: false,
		menu: 'save',
		x: 30,
		y: 110,
		w: 70,
		h: 70
	}, {
		hover: false,
		menu: 'restart',
		x: 120,
		y: 110,
		w: 70,
		h: 70
	});
}

function drawButtons() {

	buttons.forEach(function(btn) {
		if (btn.hover) {
			backgroundCtx.fillStyle = '#999';
		} else {
			backgroundCtx.fillStyle = '#aaa';
		}
		backgroundCtx.fillRect(btn.x, btn.y, 70, 70);
		backgroundCtx.fillStyle = '#000';

		if (typeof btn.obj !== 'undefined') {
			backgroundCtx.fillText(objectsType[btn.obj].name, btn.x + 10, 40);
			drawObjectBackground(btn.obj, 50, btn.x + 10);
		} else {
			backgroundCtx.fillText(btn.menu, btn.x + 10, btn.y + 20);
		}
	});
}

function clickButtons() {

	buttons.forEach(function(btn) {

		if (btn.click) {
			if (typeof btn.obj !== 'undefined') {
				changeObject(btn.obj);
			} else {
				window[btn.menu]();
			}
		}

		btn.click = false;
	});
}

function backgroundHover(event) {

	var rect = background.getBoundingClientRect(),
		x = event.clientX - rect.left,
		y = event.clientY - rect.top;

	buttons.forEach(function(btn) {

		if (
			(x > btn.x && x < btn.x + btn.w) &&
			(y > btn.y && y < btn.y + btn.h)
		) {
			btn.hover = true;
		} else {
			btn.hover = false;
		}
	});
}

function backgroundClick(event) {
	var rect = background.getBoundingClientRect(),
		x = event.clientX - rect.left,
		y = event.clientY - rect.top;

	buttons.forEach(function(btn) {

		if (
			(x > btn.x && x < btn.x + btn.w) &&
			(y > btn.y && y < btn.y + btn.h)
		) {
			btn.click = true;
		}
	});
}

function drawBackground() {

	var roadH = 70;
	var sideRoadH = 24;

	backgroundCtx.fillStyle = '#87b06b';
	backgroundCtx.fillRect(0, 0, ww, wh);

	backgroundCtx.fillStyle = '#333';
	backgroundCtx.fillRect(0, wh - roadH, ww, roadH);

	backgroundCtx.fillStyle = '#111';
	backgroundCtx.fillRect(0, wh - (roadH + 2), ww, 2);

	backgroundCtx.fillStyle = '#ddd';
	backgroundCtx.fillRect(0, wh - (roadH + 2 + sideRoadH), ww, sideRoadH);

	backgroundCtx.fillStyle = 'hsla(0, 0%, 0%, 0.3)';
	backgroundCtx.fillRect(0, wh - (roadH + 2 + sideRoadH + 1), ww, 1);

	for (var i = 0; i < 90; i++) {
		backgroundCtx.fillStyle = 'yellow';
		backgroundCtx.fillRect(i * 100, wh - 10, 35, 2);

		backgroundCtx.fillStyle = '#ccc';
		backgroundCtx.fillRect(i * 30, wh - (roadH + 2 + sideRoadH), 2, sideRoadH);
	}

	// noise
	var noiseSize = 10;

	for (var i = 0; i < ww / noiseSize; i++) {
		for (var j = 0; j < wh / noiseSize; j++) {
			backgroundCtx.fillStyle = 'hsla(0, 0%, 0%, ' + rand(1, 5) / 100 + ')';
			backgroundCtx.fillRect(noiseSize * i, noiseSize * j, noiseSize, noiseSize);
		}	
	}
}

function save() {
	alert('The game was saved');
	localStorage.setObject('SweetHome', objects);
}

function restart() {
	localStorage.removeObject('SweetHome');
	location.reload();
}

/** --------------------------------------------
 * Update
 * ------------------------------------------ */

function update() {

	// background color
	c.clearRect(0, 0, w, h);

	// room
	drawRoom(9, 2, 18, 16);

	// grid
	drawGrid();

	// objects
	drawObjects();

	// buttons
	drawButtons();
	clickButtons();

	// loop again
	requestAnimationFrame(function() {
		update();
	});
}

/** --------------------------------------------
 * Start
 * ------------------------------------------ */

canvas.addEventListener('mousemove', function(e) {
	hover(e);
}, false);

canvas.addEventListener('click', function(e) {
	click(e);
}, false);

background.addEventListener('mousemove', function(e) {
	backgroundHover(e);
}, false);

background.addEventListener('click', function(e) {
	backgroundClick(e);
}, false);

backgroundCtx.font = "13px cursive";
c.font = "13px cursive";


drawBackground();
createObjectsButtons();
createMenuButtons();
fillGrid();
update();
