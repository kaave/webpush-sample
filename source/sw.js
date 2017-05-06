/* eslint-env serviceworker */

import isJSON from 'validator/lib/isJSON';

self.addEventListener('push', event => {
  const source = event.data.text();

  const title = 'Hello Nagoya.js';
  const icon = '/icon.png';
  const body = isJSON(source) ? JSON.parse(source).data : source;
  event.waitUntil(self.registration.showNotification(title, { icon, body }));
});

