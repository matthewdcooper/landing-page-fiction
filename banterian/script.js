
const conversations = [
	{ 'message': 'Will you be able to get us an answer before Friday?',
		'reply': 'You are not worth another word, else I\'d call you knave.' },

	{ 'message': 'Are you free this weekend?',
		'reply': 'I do desire we may be better strangers.' },

	{ 'message': 'Please call me. It\'s urgent!',
		'reply': 'More of your conversation would infect my brain.' },

	{ 'message': 'Let\'s visit my family over Easter, okay?',
		'reply': 'No for they have a plentiful lack of wit.' },

	{ 'message': 'Good luck with the test. I believe in you!',
		'reply': 'There’s no more faith in thee than in a stewed prune.' },

	{ 'message': 'Your delivery will arrive in the next hour.',
		'reply': 'Away, you mouldy rogue, away!' },

];

let conversation_index = 0;

window.onload = function() {
	createExchange();
	setInterval(createExchange, 6500);

}

function createExchange() {
	removeChatElements();
	conversation_index %= conversations.length; // if conversations depleted return to beginning
	requestUser().then(function(user) {
		let message = conversations[conversation_index].message;
		createMessage(user.image_url, user.name, message);

		let reply = conversations[conversation_index++].reply;
		let isReply = true;
		setTimeout(() => createMessage('assets/shakespeare.png', 'You', reply, isReply), 1500);
		setTimeout(() => {
			let messages = document.getElementsByClassName('message');
			for (let m of messages) m.style.animationName = 'delete';
		}, 5000);
	});
}


let requestUser = () => new Promise(function(resolve, reject) {
	let req = new XMLHttpRequest();
	req.open('GET', 'https://randomuser.me/api/?nat=gb');
	req.onload = () => {
		let user = JSON.parse(req.responseText).results[0];
		resolve({'name': user.name.first, 'image_url': user.picture.thumbnail});
	}
	req.onerror = () => reject(req.statusText);
	req.send();
});



function createMessage(image_url, name, message, reply) {

	let msg = document.createElement('div');
	msg.className = 'message';
	if (reply) msg.className += ' reply';

	let img = document.createElement('img');
	img.className = 'profile_picture';
	img.src = image_url;

	let msg_content = document.createElement('div');
	msg_content.className = 'message_content';

	let h2 = document.createElement('h2');
	h2.innerText = name;

	let p = document.createElement('p');
	p.innerText = message;

	msg_content.appendChild(h2);
	msg_content.appendChild(p);
	msg.appendChild(img);
	msg.appendChild(msg_content);

	document.getElementById('chat').appendChild(msg);
}

function removeChatElements() {
	let messages = document.getElementsByClassName('message');
	for (let i = messages.length-1; i >= 0; i--) {
		messages[i].parentElement.removeChild(messages[i]);
	}
}

