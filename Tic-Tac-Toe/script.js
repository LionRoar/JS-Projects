var Player = function () {
	this.turn;
	this.isActive;
	this.weapone;
	this.elem;
	this.wins = 0;

}
var GetFirstPlayer = 1;
var p1 = new Player();
var p2 = new Player();
var aiArr = [1, 3, 7, 9, 5, 2, 4, 6, 8];
var tArr1 = [['', '', ''], ['', '', ''], ['', '', '']];
var tArr2 = [['', '', ''], ['', '', ''], ['', '', '']];
var oElem = '<svg xmlns="http://www.w3.org/2000/svg" style="margin-top: 15px;" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 390 390" width="80px" height="80px"><g><path class="drawo" d="M190.367,0C85.23,0,0,85.23,0,190.367s85.23,190.367,190.367,190.367s190.367-85.23,190.367-190.367   S295.504,0,190.367,0z M299.002,298.36c-28.996,28.996-67.57,44.959-108.634,44.959S110.723,327.35,81.733,298.36   c-28.865-28.876-44.769-67.227-44.769-107.993c0-40.771,15.904-79.128,44.769-107.993c28.99-28.996,67.57-44.959,108.634-44.959   c41.054,0,79.639,15.969,108.629,44.959c28.871,28.865,44.763,67.221,44.763,107.993   C343.765,231.133,327.867,269.489,299.002,298.36z" /></g></svg>';
var xElem = '<svg class="drawx" style="margin-top: 15px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="-3 -3 55 55" xml:space="preserve" width="80px" height="80px"><path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z" /></svg>';
$(document).ready(function () {
	start();
});

function start() {
	GetFirstPlayer = getRandom(2, 1);
	$('#one').click(singlePlayer);
	$('#two').click(MultiPlayer);
	$('#X').click(xClick);
	$('#O').click(oClick);
}

function singlePlayer() {
	setPlayer('YOU', 'COMPUTER');

}

function MultiPlayer() {
	setPlayer('PLAYER 1', 'PLAYER 2');

}

function setPlayer(t1, t2) {
	$('#p1-txt').text(t1);
	$('#p2-txt').text(t2);
	showWeapons();
}

function showWeapons() {
	$('#players').fadeOut(500);
	$('#weapones').delay(500).fadeIn(1000);
}

function xClick() {
	setWeapone('X', 'O');
	p1.elem = xElem;
	p2.elem = oElem;
	startGame();
}

function oClick() {
	setWeapone('O', 'X');
	p1.elem = oElem;
	p2.elem = xElem;
	startGame();
}

function setWeapone(a, b) {
	p1.weapone = a;
	p2.weapone = b;
	$('#p1-weapone').text('| ' + a + ' |');
	$('#p2-weapone').text('| ' + b + ' |');
	showBoard();
}

function showBoard() {
	$('#weapones').fadeOut(500);
	$('#t-board').delay(500).fadeIn(1000);
}

function whosTurn() {
	if (p1.isActive) {
		$('#p1-icon').addClass('active-p');
		$('#p1-txt').addClass('active-t');
		$('#p2-icon').removeClass('active-p');
		$('#p2-txt').removeClass('active-t');
		p1.isActive = false;
		p2.isActive = true;
	} else if (p2.isActive) {
		$('#p2-icon').addClass('active-p');
		$('#p2-txt').addClass('active-t');
		$('#p1-icon').removeClass('active-p');
		$('#p1-txt').removeClass('active-t');
		p1.isActive = true;
		p2.isActive = false;
	}

}

function isCup() {
	return $('#p2-txt').text() == 'COMPUTER';
}

function getActive() {
	if (p1.isActive) {
		return p1;
	} else {
		return p2;
	}
}

function startGame() {
	setTurn(GetFirstPlayer);
	whosTurn();
	if (isCup()) {
		singlePlayerMode();
	} else {
		MultiPlayerMode();

	}
}

function MultiPlayerMode() {

	$('.e').click(X_O);
}

function singlePlayerMode() {
	var box = '#b';
	if (p2.turn == 1) {
		var randomPos = aiArr[getRandom(5, 0)];
		$(box + randomPos).html(p2.elem);
		aiFilter($(box + randomPos), p2.weapone);
		$('.e').click(ai1stMoveOfsecond);
	} else {
		$('.e').click(ai1stMoveOfsecond);
	}
}

function X_O() {
	$('.box').unbind('click', X_O);
	whosTurn();
	var p = getActive();
	$(this).html(p.elem);
	aiFilter($(this), p.weapone);
	$('.e').bind('click', X_O);
	checkWinner();
}

function aiFilter($box, elm) {
	var id = eval($box.attr('id').replace('b', ''));
	tArr1[eval($box.attr('a'))][eval($box.attr('b'))] = elm;
	tArr2[eval($box.attr('b'))][eval($box.attr('a'))] = elm;
	aiArr = aiArr.filter(function (val) {
		return id != val;
	});
	$box.removeClass('e');

}

function setTurn(t) {
	if (t == 1) {
		p1.turn = 1;
		p2.turn = 2;
		p1.isActive = true;
		p2.isActive = false;

	} else if (t == 2) {
		p1.turn = 2;
		p2.turn = 1;
		p1.isActive = false;
		p2.isActive = true;

	}
}

function workMyMagic() {
	var box = '#b';
	var $b = checkStatus();
	var rand = aiArr[0];
	if (aiArr.length > 1) {
		if ($b == null) {
			rand = aiArr[getRandom(aiArr.length, 0)];
			aiFilter($(box + rand), p2.weapone);
			$(box + rand).html(p2.elem);
			console.log('random');
			console.log(aiArr + " after-rand = " + rand);

		} else {
			aiFilter($b, p2.weapone);
			$b.html(p2.elem);
			console.log('not random');
		}
	} else {
		aiFilter($(box + rand), p2.weapone);
		$(box + rand).html(p2.elem);
	}
	console.log("tArr1 " + tArr1[0] + " tArr2 " + tArr2[0]);
}

function checkStatus() {
	console.log('stat');
	var regex = new RegExp("^(" + p1.weapone + ")\\1$");
	var regexW = new RegExp("^(" + p2.weapone + ")\\1$");
	console.log(regexW);
	var $danger = null;
	for (var i = 0; i < 3; i++) {
		if (regex.test(tArr1[i].join(''))) {
			$danger = $(".box[a='" + i + "'][b='" + tArr1[i].indexOf('') + "']");
			console.log('1' + " " + tArr1[i].indexOf(''));
		}

	}
	for (var j = 0; j < 3; j++) {
		if (regex.test(tArr2[j].join(''))) {
			$danger = $(".box[a='" + tArr2[j].indexOf('') + "'][b='" + j + "']");
			console.log('2');

		}

	}

	if ((regex.test(tArr1[0][0] + tArr1[1][1] + tArr1[2][2]))) {
		console.log('3');
		console.log(tArr1[0][0] + tArr1[1][1] + tArr1[2][2]);
		console.log((regex.test(tArr1[0][0] + tArr1[1][1] + tArr1[2][2])));


		if (tArr1[0][0] == '') {
			$danger = $('.box[a="0"][b="0"]');
		} else if (tArr1[1][1] == '') {
			$danger = $('.box[a="1"][b="1"]');
		} else if (tArr1[2][2] == '') {
			$danger = $('.box[a="2"][b="2"]');
		}

	}
	if ((regex.test(tArr1[0][2] + tArr1[1][1] + tArr1[2][0]))) {
		console.log('4');
		if (tArr1[0][2] == '') {
			$danger = $('.box[a="0"][b="2"]');
		} else if (tArr1[1][1] == '') {
			$danger = $('.box[a="1"][b="1"]');
		} else if (tArr1[2][0] == '') {
			$danger = $('.box[a="2"][b="0"]');
		}
	}

	for (var ii = 0; ii < 3; ii++) {
		if (regexW.test(tArr1[ii].join(''))) {
			console.log('5');

			$danger = $(".box[a='" + ii + "'][b='" + tArr1[ii].indexOf('') + "']");
		}
	}
	for (var jj = 0; jj < 3; jj++) {
		console.log('jj ' + tArr2[jj]);

		if (regexW.test(tArr2[jj].join(''))) {
			console.log('6');

			$danger = $(".box[a='" + tArr2[jj].indexOf('') + "'][b='" + jj + "']");
		}
	}
	if ((regexW.test(tArr1[0][0] + tArr1[1][1] + tArr1[2][2]))) {
		console.log('7');

		if (tArr1[0][0] == '') {
			$danger = $('.box[a="0"][b="0"]');
		} else if (tArr1[1][1] == '') {
			$danger = $('.box[a="1"][b="1"]');
		} else if (tArr1[2][2] == '') {
			$danger = $('.box[a="2"][b="2"]');
		}

	}
	if ((regexW.test(tArr1[0][2] + tArr1[1][1] + tArr1[2][0]))) {
		console.log('8');

		if (tArr1[0][2] == '') {
			$danger = $('.box[a="0"][b="2"]');
		} else if (tArr1[1][1] == '') {
			$danger = $('.box[a="1"][b="1"]');
		} else if (tArr1[2][0] == '') {
			$danger = $('.box[a="2"][b="0"]');
		}

	}
	console.log($danger != null ? $danger.attr('id') : 'null');
	return $danger;
}

function ai() {
	whosTurn();
	$('.box').unbind('click', ai);
	$(this).html(p1.elem);
	aiFilter($(this), p1.weapone)
	setTimeout(function () {
		whosTurn();
		workMyMagic();
		$('.e').bind('click', ai);
	}, 1500);
	setTimeout(checkWinner, 1600);


}

function ai1stMoveOfsecond() {
	whosTurn();
	$('.box').unbind('click', ai1stMoveOfsecond);
	var id = eval($(this).attr('id').replace('b', ''));
	$(this).html(p1.elem);
	aiFilter($(this), p1.weapone)
	if (id != 5 && aiArr.includes(5)) {
		setTimeout(function () {
			whosTurn();
			aiFilter($('#b5'), p2.weapone);
			$('#b5').html(p2.elem);
			$('.e').bind('click', ai2ndMoveOfsecond);
		}, 1500);
	} else {
		setTimeout(function () {
			whosTurn();
			var box = '#b';
			var randomPos = aiArr[getRandom(4, 0)];
			$(box + randomPos).html(p2.elem);
			aiFilter($(box + randomPos), p2.weapone);
			$('.e').bind('click', ai2ndMoveOfsecond);
		}, 1500);
	}

	setTimeout(checkWinner, 1600);

}

function ai2ndMoveOfsecond() {
	whosTurn();
	$('.box').unbind('click', ai2ndMoveOfsecond);
	$(this).html(p1.elem);
	var corner = $(this).attr('id').replace('b', '');
	aiFilter($(this), p1.weapone)
	var $box = checkStatus();
	console.log('second ' + $box);
	if ($box == null) {
		setTimeout(function () {
			whosTurn();
			var b = '#b';
			if (tArr1[1][1] != p1.weapone && (corner != 1 || corner != 3 || corner != 7 || corner != 9)) {
				b += aiArr[aiArr.length - 1];
			} else {
				b += aiArr[0];
			}
			aiFilter($(b), p2.weapone)
			$(b).html(p2.elem);
			$('.e').bind('click', ai);
		}, 1500);
	} else {
		setTimeout(function () {
			whosTurn();
			aiFilter($box, p2.weapone)
			$box.html(p2.elem);
			$('.e').bind('click', ai);
		}, 1500);

	}
	setTimeout(checkWinner, 1600);

}

function getRandom(a, b) {
	return Math.floor(Math.random() * a) + b;
}

function setTurns() {
	var rand = getRandom(2, 1);
	if (rand == 1) {
		p1.turn = 1;
		p2.turn = 2;
	} else {
		p1.turn = 1;
		p2.turn = 2;
	}
}



function checkWinner() {
	if (aiArr.length == 0) {
		draw();
	}


	var regex = /^(\w)\1\1$/;
	for (var i = 0; i < tArr1.length; i++) {
		if (tArr1[i].join('').match(regex)) {
			$(".box[a='" + i + "']").addClass('mark');
			theWinner(tArr1[i][0]);

		}
	}
	for (var j = 0; j < tArr1.length; j++) {
		if (tArr2[j].join('').match(regex)) {
			$(".box[b='" + j + "']").addClass('mark');
			theWinner(tArr2[j][0]);

		}
	}


	if ((tArr1[0][0] + tArr1[1][1] + tArr1[2][2]).match(regex)) {
		$(".box[a='0'][b='0']").addClass('mark');
		$(".box[a='1'][b='1']").addClass('mark');
		$(".box[a='2'][b='2']").addClass('mark');
		theWinner(tArr1[0][0]);

	}
	if ((tArr1[0][2] + tArr1[1][1] + tArr1[2][0]).match(regex)) {
		$(".box[a='0'][b='2']").addClass('mark');
		$(".box[a='1'][b='1']").addClass('mark');
		$(".box[a='2'][b='0']").addClass('mark');
		theWinner(tArr1[0][2]);

	}

}

function draw() {
	$('#result h1').text("IT'S A DRAW!");
	$('#result').css('display', 'block');
	$('#result').click(function () {
		$(this).hide();
		reset();
	});
}

function reset() {
	tArr1 = [['', '', ''], ['', '', ''], ['', '', '']];
	tArr2 = [['', '', ''], ['', '', ''], ['', '', '']];
	aiArr = [1, 3, 7, 9, 5, 2, 4, 6, 8];
	$('.box').removeClass('e');
	$('.box').removeClass('mark');
	$('.box').unbind();
	$('.box').html('');
	$('.box').addClass('e');
	counter = 0;
	startGame();
}

function showResult() {
	$('#result').css('display', 'block');
	$('#result').click(function () {
		$(this).hide();
		reset();
	});
}

function theWinner(win) {
	if (win == p1.weapone) {
		++p1.wins;
		$('#p1-points').text(p1.wins);
		$('#result h1').text($('#p1-txt').text());
		showResult();


	} else {
		++p2.wins;
		$('#p2-points').text(p2.wins);
		$('#result h1').text($('#p2-txt').text());
		showResult();

	}
}
