/* eslint-env serviceworker */

import format from 'date-fns/format';

self.addEventListener('install', () => console.log(`[${format(Date.now(), 'YYYY/MM/DD HH:mm:ss')}] Service worker install completed`));
