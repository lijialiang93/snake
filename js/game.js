interval = 120;
px = 15;
py = 10;
tcw = 30;
tch = 20;
gs = 20;
ax = 20;
ay = 15;
xv = yv = 0;
trail = [];
tail = 4;
score = 0
high = 0;
prev = 0;
wallCheck = false;
var pointSound = document.createElement("audio");
var deathSound = document.createElement("audio");
var highSound = document.createElement("audio");

pointSound.src = "media/point.wav";
deathSound.src = "media/death.wav";
highSound.src = "media/high.wav";

pointSound.preload = "auto";
deathSound.preload = "auto";
highSound.preload = "auto";

window.onload = function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");
	document.addEventListener("keydown", keyPush);
	run = setInterval(game, interval);
}

function game() {
	clearInterval(run);
	px += xv;
	py += yv;
	if (wallCheck == false) {
		if (px < 0) {
			px = tcw - 1;
		}
		if (px > tcw - 1) {
			px = 0;
		}
		if (py < 0) {
			py = tch - 1;
		}
		if (py > tch - 1) {
			py = 0;
		}
	}

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canv.width, canv.height);

	ctx.fillStyle = "red";
	ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);

	ctx.fillStyle = "red";
	ctx.font = "15px Verdana";
	ctx.fillText(high, 15, 15);
	ctx.fillStyle = "black";
	ctx.fillText(score, 15, 30);


	ctx.fillStyle = "black";
	for (var i = 0; i < trail.length; i++) {
		ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);

		if (i == trail.length - 1) {
			ctx.clearRect(trail[i].x * gs + 4, trail[i].y * gs + 4, gs / 2, gs / 2);
		}

		if (trail[i].x == px && trail[i].y == py && tail != 4) {
			if (score > 0) {
				deathSound.play();
			}
			prev = high;
			tail = 4;
			score = 0;
			interval = 120;
			px = 15;
			py = 10;
			xv = yv = 0;
			trail = [];
			run = setInterval(game, interval);
			return;
		}
	}

	if (wallCheck == true) {
		if (px == tcw + 1 || px == -2 || py == tch + 1 || py == -2) {
			deathSound.play();
			prev = high;
			tail = 4;
			score = 0;
			interval = 120;
			px = 15;
			py = 10;
			xv = yv = 0;
			trail = [];
			run = setInterval(game, interval);
			return;
		}

	}


	trail.push({
		x: px,
		y: py
	});


	while (trail.length > tail) {
		trail.shift();
	}



	if (ax == px && ay == py) {
		score++
		if (score > prev && prev != 0) {
			highSound.play();
			prev = 9999;
		} else {
			pointSound.play();
		}
		if (score > high) {
			high = score;
		}

		tail++;
		interval = interval * 0.98;

		loop:
			while (true) {
				ax = Math.floor(Math.random() * tcw);
				ay = Math.floor(Math.random() * tch);
				if (ax == 15 && ay == 10) {
					continue loop;
				}
				for (var i = 0; i < trail.length; i++) {
					if (trail[i].x == ax && trail[i].y == ay) {
						continue loop;
					}
				}
				break;
			}

		run = setInterval(game, interval);
		return;
	}
	run = setInterval(game, interval);
	return;

}


function keyPush(evt) {

	if (evt.keyCode == 37 || evt.keyCode == 65) {
		if (xv != 1) {
			xv = -1;
			yv = 0;
		}
	} else if (evt.keyCode == 38 || evt.keyCode == 87) {
		if (yv != 1) {
			xv = 0;
			yv = -1;
		}
	} else if (evt.keyCode == 39 || evt.keyCode == 68) {
		if (xv != -1) {
			xv = 1;
			yv = 0;
		}

	} else if (evt.keyCode == 40 || evt.keyCode == 83) {
		if (yv != -1) {
			xv = 0;
			yv = 1;
		}
	}
}

function wall() {
	var wallBtn = document.getElementById("wallBtn");
	var wallgc = document.getElementById("gc");
	if (wallBtn.value == "on") {
		wallBtn.src = "images/walloff.png"
		wallBtn.value = "off";
		wallCheck = false;
		wallgc.style.border = "4px dashed black";
	} else {
		wallBtn.src = "images/wallon.png"
		wallBtn.value = "on";
		wallCheck = true;
		wallgc.style.border = "4px solid black";
	}
}

function mute() {
	var muteBtn = document.getElementById("muteBtn");


	if (muteBtn.value === "MUTE") {
		muteBtn.src = "images/off.png"
		muteBtn.value = "UNMUTE";
		pointSound.muted = true;
		deathSound.muted = true;
		highSound.muted = true;
	} else {
		muteBtn.src = "images/on.png"
		muteBtn.value = "MUTE";
		pointSound.muted = false;
		deathSound.muted = false;
		highSound.muted = false;
	}
}