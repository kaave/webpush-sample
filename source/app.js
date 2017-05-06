import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';

import * as Manager from './scripts/sw-manager';

window.addEventListener('DOMContentLoaded', () => {
  const buttonElement = document.querySelector('.js-request');
  buttonElement.addEventListener('click', async () => {
    await initPushWorker();
  });
});

async function initPushWorker () {
  const publicKey = 'BIxbTMDKpqsEIv4GURJFIvacn0ojx6hVm66_bpYyvBpqlrW16hNboNE6yFcKNGsa-3ept34Jy-BNB6ftjwSpJVE';
// private key memo: baG5zFzd027eHcz73DHxIl-7QazxY248R_CN_6b0e0E

  const register = await Manager.getRegister({ filePath: '/sw.js' });
  const subscription = await Manager.getSubscription({ register });
  if (subscription) {
    // 既にsubscribe済
    setData({ data: JSON.stringify(subscription.toJSON(), null, '    ') });
  } else {
    // まだsubscribeしてないので、subscribeする
    const subscriber = await Manager.subscribe({ register, publicKey });
    setData({ data: JSON.stringify(subscriber.toJSON(), null, '    ') });
  }
}

function setData ({ data }) {
  const element = document.querySelector('.js-code');
  element.innerHTML = data;
  hljs.initHighlighting();
}
