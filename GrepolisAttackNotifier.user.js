// ==UserScript==
// @name          Grepolis Attack Notifier
// @namespace     github.com/davidkna/Grepolis-Attack-Notifier
// @description   Get native Browser Notifications when you are attacked on Grepolis! Be sure to attack yourself and grant Grepolis permission to send you notfications 'always'.
// @version       1.1.3
// @include       *://*.grepolis.*/game*
// @grant         none
// @downloadURL   https://raw.githubusercontent.com/davidkna/Grepolis-Attack-Notifier/master/GrepolisAttackNotifier.user.js
// @updateURL     https://raw.githubusercontent.com/davidkna/Grepolis-Attack-Notifier/master/GrepolisAttackNotifier.meta.js
// ==/UserScript==
"use strict";function main(){function i(i){switch(o){case"de":return"Du wirst auf Grepolis angegriffen!\n"+i+"  Angriffe auf dem Weg.";case"en":default:return"You are being attacked on Grepolis!\n"+i+" attacks incoming."}}function e(e){{var n={lang:o,body:i(e)};new Notification("Grepolis Attack Notifier",n)}}function n(e){alert(i(e))}function t(i){"granted"===Notification.permission?e(i):"denied"!==Notification.permission?(alert("Please give Grepolis Attack Notifier permission to send notifications"),Notification.requestPermission(function(t){"permission"in Notification||(Notification.permission=t),"granted"===t?e(i):n(i)})):"denied"===Notification.permission&&n(i)}var o="en",r=["de","en"],a=Game.market_id,s=r.indexOf(a);s>=0&&(o=r[s]),$.Observer(GameEvents.attack.incoming).subscribe(function(i,e){t(e.count)})}var script=document.createElement("script");script.type="text/javascript",script.innerHTML=""+main.toString()+"main()",document.querySelector("head").appendChild(script);