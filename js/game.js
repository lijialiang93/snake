pointSound = document.createElement("audio");
deathSound = document.createElement("audio");
highSound = document.createElement("audio");
bonusSound = document.createElement("audio");
pointSound.src = "media/point.wav";
deathSound.src = "media/death.wav";
highSound.src = "media/high.wav";
bonusSound.src = "media/bonus.wav";
pointSound.preload = "auto";
deathSound.preload = "auto";
highSound.preload = "auto";
bonusSound.preload = "auto";
interval = 100;
px = 15;
py = 10;
tcw = 30;
tch = 20;
gs = 20;
ax = 20;
ay = 15;
xv = 0;
yv = 0;
trail = [];
tail = 4;
score = 0
high = 0;
prev = 0;
wallCheck = false;
hitCounter = 0;
bonus = 5;
speed = 0.98;
pause = false;


window.onload = function () {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");
	document.addEventListener("keydown", keyPush);
	setTimeout(game, interval);
}

function game() {
	pause = false;
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canv.width, canv.height);

	if (hitCounter == bonus) {
		ctx.fillStyle = "red";
		ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
	}
	else {
		ctx.fillStyle = "red";
		ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
		ctx.clearRect(ax * gs + 4, ay * gs + 4, gs / 2, gs / 2);
	}

	px += xv;
	py += yv;
	if (wallCheck == false) {
		if (px < 0) {
			px = tcw - 1;
		}
		else if (px > tcw - 1) {
			px = 0;
		}
		else if (py < 0) {
			py = tch - 1;
		}
		else if (py > tch - 1) {
			py = 0;
		}
	}

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
			death();
			break;
		}
		if (wallCheck == true) {
			if (trail[i].x < 0 || trail[i].x > tcw - 1||trail[i].y < 0 || trail[i].y > tch - 1) {
				death();
				break;
			}
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
		var checkSound = false;
		if (hitCounter == bonus) {
			score = score + 5;
			hitCounter = 0;
			bonus = bonus + 2;
			checkSound = true;
		}
		else {
			score++
			hitCounter++;
		}


		if (score > prev && prev != 0) {
			highSound.play();
			prev = 9999;
		} else {
			if (checkSound) {
				bonusSound.play();
			}
			else {
				pointSound.play();
			}
		}
		if (score > high) {
			high = score;
		}

		tail++;
		interval = interval * speed;

		loop:
		while (true) {
			ax = Math.floor(Math.random() * tcw);
			ay = Math.floor(Math.random() * tch);
			if (ax == tcw / 2 && ay == tch / 2) {
				continue loop;
			}
			for (var i = 0; i < trail.length; i++) {
				if (trail[i].x == ax && trail[i].y == ay) {
					continue loop;
				}
			}
			break;
		}

		setTimeout(game, interval);
		return;
	}
	setTimeout(game, interval);
	return;

}


function keyPush(evt) {
	if (!pause) {
		if (evt.keyCode == 37) {
			if (xv != 1) {
				xv = -1;
				yv = 0;
			}
		} else if (evt.keyCode == 38) {
			if (yv != 1) {
				xv = 0;
				yv = -1;
			}
		} else if (evt.keyCode == 39) {
			if (xv != -1) {
				xv = 1;
				yv = 0;
			}

		} else if (evt.keyCode == 40) {
			if (yv != -1) {
				xv = 0;
				yv = 1;
			}
		}
	}
}

function wall() {
	wallBtn = document.getElementById("wallBtn");
	wallgc = document.getElementById("gc");
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
	muteBtn = document.getElementById("muteBtn");


	if (muteBtn.value == "MUTE") {
		muteBtn.src = "images/off.png"
		muteBtn.value = "UNMUTE";
		pointSound.muted = true;
		deathSound.muted = true;
		highSound.muted = true;
		bonusSound.muted = true;
	} else {
		muteBtn.src = "images/on.png"
		muteBtn.value = "MUTE";
		pointSound.muted = false;
		deathSound.muted = false;
		highSound.muted = false;
		bonusSound.muted = false;
	}
}

function death() {
	pause = true;
	deathSound.play();
	prev = high;
	tail = 4;
	score = 0;
	interval = 100;
	px = tcw / 2;
	py = tch / 2;
	xv = 0;
	yv = 0;
	bonus = 5;
	hitCounter = 0;
}