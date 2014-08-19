// ==UserScript==
// @name          Grepolis Attack Notifier
// @namespace     github.com/davidkna/Grepolis-Attack-Notifier
// @description   Get native Browser Notifications when you are attacked on Grepolis! Be sure to attack yourself and grant Grepolis permission to send you notfications 'always'.
// @version       1.0.1
// @include	      *://*.grepolis.*/game*
// @grant					none
// @downloadURL		https://raw.githubusercontent.com/davidkna/Grepolis-Attack-Notifier/master/GrepolisAttackNotifier.user.js
// @updateURL			https://raw.githubusercontent.com/davidkna/Grepolis-Attack-Notifier/master/GrepolisAttackNotifier.meta.js
// ==/UserScript==
'use strict';
var GAN = {
	init: function () {
		GAN.setLang();
		GAN.startObserving();
	},
	setLang: function () {
		GAN.lang = 'en';
    if (unsafeWindow.Game.market_id in GAN.translations) {
			GAN.lang = unsafeWindow.Game.market_id;
		}
	},
	startObserving: function () {
		unsafeWindow.$.Observer(unsafeWindow.GameEvents.attack.incoming)
			.subscribe(function (e, data) {
				GAN.sendNotification(data.count);
			});
	},
	sendNotification: function (count) {
    // Stolen and modified from https://developer.mozilla.org/en-US/docs/Web/API/notification
		// Let's check if the browser supports notifications
		if (!('Notification' in window)) {
			GAN.sendAlertNotification(count);
		}

		// Let's check if the user is okay to get some notification
		else if (Notification.permission === 'granted') {
			// If it's okay let's create a notification
			GAN.sendRealNotification(count);
		}

		// Otherwise, we need to ask the user for permission
		// Note, Chrome does not implement the permission static property
		// So we have to check for NOT 'denied' instead of 'default'
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {

				// Whatever the user answers, we make sure we store the information
				if (!('permission' in Notification)) {
					Notification.permission = permission;
				}

				// If the user is okay, let's create a notification
				if (permission === 'granted') {
					GAN.sendRealNotification(count);
				} else {
          GAN.sendAlertNotification(count);
        }
			});
		} else if (Notification.permission === 'denied') {
      GAN.sendAlertNotification(count);
    }
	},
	sendRealNotification: function (count) {
		var options = {
			lang: GAN.lang,
			body: GAN.getNotificationBody(count)
		};
		var notification = new Notification('Grepolis Attack Notifier', options);
	},
	sendAlertNotification: function (count) {
    alert(GAN.getNotificationBody(count));
	},
  getNotificationBody: function(count) {
    return GAN.translations[GAN.lang].notificationBody.replace('#{ count }', count);
  },
  translations: {
		de: {
			notificationBody: 'Du wirst auf Grepolis angegriffen!\n #{ count } Angriffe auf dem Weg.'
		},
		en: {
      notificationBody: 'You are being attacked on Grepolis!\n #{ count } attacks incomiing.'
		}
	}

};

GAN.init();
