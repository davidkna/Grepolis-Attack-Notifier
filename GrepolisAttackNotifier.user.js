// ==UserScript==
// @name          Grepolis Attack Notifier
// @namespace     github.com/davidkna/Grepolis-Attack-Notifier
// @description   Get native Browser Notifications when you are attacked on Grepolis! Be sure to attack yourself and grant Grepolis permission to send you notfications 'always'.
// @version       1.1.0
// @include       *://*.grepolis.*/game*
// @grant         none
// @downloadURL   https://raw.githubusercontent.com/davidkna/Grepolis-Attack-Notifier/master/GrepolisAttackNotifier.user.js
// @updateURL     https://raw.githubusercontent.com/davidkna/Grepolis-Attack-Notifier/master/GrepolisAttackNotifier.meta.js
// ==/UserScript==
"use strict";function main(){function i(i){switch(o){case"de":return"Du wirst auf Grepolis angegriffen!\n"+i+"  Angriffe auf dem Weg.";case"en":default:return"You are being attacked on Grepolis!\n"+i+" attacks incoming."}}function e(e){{var t={lang:o,body:i(e)};new Notification("Grepolis Attack Notifier",t)}}function t(e){alert(i(e))}function n(i){"granted"===Notification.permission?e(i):"denied"!==Notification.permission?(alert("Please give Grepolis Attack Notifier permission to send notifications"),Notification.requestPermission(function(n){"permission"in Notification||(Notification.permission=n),"granted"===n?e(i):t(i)})):"denied"===Notification.permission&&t(i)}var o="en";Game.market_id in["de","en"]&&(o=Game.market_id),$.Observer(GameEvents.attack.incoming).subscribe(function(i,e){n(e.count)})}var script=document.createElement("script");script.type="text/javascript",script.innerHTML=""+main.toString()+"main()",document.querySelector("head").appendChild(script);