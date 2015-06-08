// ==UserScript==
// @name          Grepolis Attack Notifier
// @namespace     github.com/davidkna/Grepolis-Attack-Notifier
// @description   Get native Browser Notifications when you are attacked on Grepolis! Be sure to attack yourself and grant Grepolis permission to send you notfications 'always'.
// @version       1.1.2
// @include       *://*.grepolis.*/game*
// @grant         none
// @downloadURL   https://cdn.rawgit.com/davidkna/Grepolis-Attack-Notifier/master/GrepolisAttackNotifier.user.js
// @updateURL     https://cdn.rawgit.com/davidkna/Grepolis-Attack-Notifier/master/GrepolisAttackNotifier.meta.js
// ==/UserScript==

function main() {
	let lang = 'en';
	const langs = ['de', 'en'];
	const gameMarket = Game.market_id;
	const index = langs.indexOf(gameMarket);
	if (index >= 0) {
		lang = langs['index'];
	}

	$.Observer(GameEvents.attack.incoming)
		.subscribe((e, data) => {
			sendNotification(data.count);
		});

	function getNotificationBody(count) {
		switch (lang) {
			case "de":
				return `Du wirst auf Grepolis angegriffen!\n${ count }  Angriffe auf dem Weg.`;
				break;
			case "en":
			default:
				return `You are being attacked on Grepolis!\n${ count } attacks incoming.`;
			}
		}

	function sendRealNotification(count) {
		const options = {
			lang: lang,
			body: getNotificationBody(count)
		};
		var notification = new Notification('Grepolis Attack Notifier', options);
	}

	function sendAlertNotification(count) {
		alert(getNotificationBody(count));
	}


	function sendNotification(count) {
		if (Notification.permission === 'granted') {
			sendRealNotification(count);
		}
		else if (Notification.permission !== 'denied') {

			alert("Please give Grepolis Attack Notifier permission to send notifications");

			Notification.requestPermission((permission) => {

				if (!('permission' in Notification)) {
					Notification.permission = permission;
				}
				if (permission === 'granted') {
					sendRealNotification(count);
				} else {
					sendAlertNotification(count);
				}
			});
		} else if (Notification.permission === 'denied') {
			sendAlertNotification(count);
		}
	}
}

const script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = `${ main.toString() }main()`;
document.querySelector('head').appendChild(script);
