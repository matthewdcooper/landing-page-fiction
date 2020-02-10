
function stop() {
	let body = document.getElementsByTagName('body')[0];
	let yuck = document.getElementById('yuck');

	body.style.animationIterationCount = 1;
	yuck.style.animationIterationCount = 1;

	body.style.animationDuration = '4s';
	yuck.style.animationDuration = '4s';

	body.style.animationName = 'whiten';
	yuck.style.animationName = 'fadeout';

	setTimeout(better, 4200);
}

function better() {
	let result = document.getElementById('result');
	result.style.display = 'block';
	result.style.animationName = 'fadein';
}
