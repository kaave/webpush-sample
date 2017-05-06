import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';

import { getRegister, getSubscriptionOrNull, subscribe } from './scripts/sw-manager';

let buttonElement;
let codeElement;

window.addEventListener('DOMContentLoaded', () => {
  buttonElement = document.querySelector('.js-request');
  codeElement = document.querySelector('.js-code');
  buttonElement.addEventListener('click', async () => {
    await initPushWorker();
    buttonElement.style.display = 'none';
  });
});

async function initPushWorker () {
  const publicKey = 'BIxbTMDKpqsEIv4GURJFIvacn0ojx6hVm66_bpYyvBpqlrW16hNboNE6yFcKNGsa-3ept34Jy-BNB6ftjwSpJVE';

  const register = await getRegister({ filePath: '/sw.js' });
  const subscriptionOrNull = await getSubscriptionOrNull({ register });
  const subscription = subscriptionOrNull || await subscribe({ register, publicKey });
  setData({ json: JSON.stringify(subscription.toJSON(), null, '    ') });
}

function setData ({ json }) {
  codeElement.innerHTML = json;
  hljs.initHighlighting();
}

