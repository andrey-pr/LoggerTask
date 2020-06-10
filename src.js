let API_KEY = '80f0fb17268c43adb6f1e2bb51a67940';


if (document.getElementById('auth-login') !== null) {
	document.getElementById('auth-login').onsubmit = () => {
		setCookie('email', document.getElementById('id_login').value)
	}
}
if (document.getElementById('auth') !== null) {
	document.getElementById('auth').onsubmit = () => {
		setCookie('email', document.getElementById('id_email').value)
		fetch('https://api.affcountry.com/api/session/', { // TODO url
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': getCookie('email'),
				'service_api_key': API_KEY,
				'phone_number': document.getElementById('id_phone')
			})
		})
	}
}


if (document.getElementById('payment') !== null) {
	document.getElementById('payment').onsubmit = () => {
		if (document.getElementById('id_amount').value === "" || document.getElementById('id_tp_account').value === "")
			return;
		fetch('https://api.affcountry.com/api/session/' + getCookie('tracksession') + '/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': getCookie('email'),
				'service_api_key': API_KEY,
				'is_click_deposit_button': true
			})
		})
	}
}

bindSupportTracker();

function bindSupportTracker() {
	if (document.getElementById('jvlabelWrap') !== null) {
		document.getElementById('jvlabelWrap').onclick = onsupportwrite;
	}
	setTimeout(bindSupportTracker, 1000);
}

function onsupportwrite() {
	if (isCookie('tracksession')) {
		fetch('https://api.affcountry.com/api/session/' + getCookie('tracksession') + '/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': getCookie('email'),
				'service_api_key': API_KEY,
				'is_write_to_support': true
			})
		})
	}
}

if (window.location.href.includes('dashboard/contact')) {
	document.getElementById('form').onsubmit = () => {
		fetch('https://api.affcountry.com/api/session/' + getCookie('tracksession') + '/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': getCookie('email'),
				'service_api_key': API_KEY,
				'is_write_to_support': true
			})
		})
	}
}

if (window.location.href.includes('accounts/password/change')) {
	document.getElementById('form').onsubmit = () => {
		fetch('https://api.affcountry.com/api/session/' + getCookie('tracksession') + '/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': getCookie('email'),
				'service_api_key': API_KEY,
				'is_change_password': true
			})
		})
	}
}


if(isCookie('tracksession')) {
	setCookie('tracksession', getCookie('tracksession'), {'max-age': 10800});
}


if (isCookie('email') && !isCookie('tracksession')) {
	fetch('https://api.affcountry.com/api/session/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'email': getCookie('email'),
			'service_api_key': API_KEY,
			'user_agent': window.navigator.userAgent,
			'logout_time': null,
			'is_click_platform': false,
			'is_click_personal_account': false,
			'is_write_to_support': false,
			'is_click_deposit_button': false,
			'is_click_contacts': false,
			'is_change_password': false
		})
	})
		.then(response => {
			return response.json()
		})
		.then(response => {
			console.log(response);
			setCookie('tracksession', response.session_id, {'max-age': 10800})
		})
}


let links = document.getElementsByTagName('a');
for (let i = 0; i < links.length; i++) {
	if (links[i].href.includes("accounts/logout"))
		links[i].onclick = onlogout;
	else if (links[i].href.includes("https://katanainvest.sirixtrader.com"))
		links[i].onclick = onclickplatform;
	else if (links[i].href.includes("https://katanainvest.com/payment/deposit/mp"))
		links[i].onclick = onclickpersonalaccount;
	else if (links[i].href.includes("https://katanainvest.com/ru/about/contacts"))
		links[i].onclick = onclickcontacts;
	else
		links[i].onclick = () => {
			onclicklink(i)
		};
}

function onlogout() {
	if (isCookie('tracksession')) {
		let datetime = new Date();
		fetch('https://api.affcountry.com/api/session/' + getCookie('tracksession') + '/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': getCookie('email'),
				'service_api_key': API_KEY,
				'logout_time': datetime.getFullYear() + '-' + datetime.getMonth() + '-' + datetime.getDay() + 'T' + datetime.getHours() + ':' + datetime.getMinutes() + 'Z'
			})
		});
		deleteCookie('tracksession');
		deleteCookie('email');
	}
}

function onclickplatform(e) {
	if (isCookie('tracksession')) {
		fetch('https://api.affcountry.com/api/session/' + getCookie('tracksession') + '/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': getCookie('email'),
				'service_api_key': API_KEY,
				'is_click_platform': true
			})
		})
	}
}

function onclickpersonalaccount(e) {
	if (isCookie('tracksession')) {
		fetch('https://api.affcountry.com/api/session/' + getCookie('tracksession') + '/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': getCookie('email'),
				'service_api_key': API_KEY,
				'is_click_personal_account': true
			})
		})
	}
}

function onclickcontacts(e) {
	if (isCookie('tracksession')) {
		fetch('https://api.affcountry.com/api/session/' + getCookie('tracksession') + '/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'email': getCookie('email'),
				'service_api_key': API_KEY,
				'is_click_contacts': true
			})
		})
	}
}

function onclicklink(i) {
	if (isCookie('tracksession')) {
		fetch('https://api.affcountry.com/api/session/' + getCookie('tracksession') + '/click_url/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'url': links[i].href
			})
		});
	}
}


function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function isCookie(name) {
	return getCookie(name) !== undefined;
}

function setCookie(name, value, options = {}) {

	options = {
		path: '/',
		...options
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

function deleteCookie(name) {
	setCookie(name, "", {
		'max-age': -1
	})
}
