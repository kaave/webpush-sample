/* eslint-env serviceworker */

self.addEventListener('push', event => {
  const title = 'Hello Nagoya.js';
  const icon = '/icon.png';
  const body = event.data.text();
  event.waitUntil(self.registration.showNotification(title, { icon, body }));
});
