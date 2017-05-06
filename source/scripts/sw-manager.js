const applicationServerPublicKey = 'BIxbTMDKpqsEIv4GURJFIvacn0ojx6hVm66_bpYyvBpqlrW16hNboNE6yFcKNGsa-3ept34Jy-BNB6ftjwSpJVE';
// private key memo: baG5zFzd027eHcz73DHxIl-7QazxY248R_CN_6b0e0E

export default class ServiceWorkerManager {
  constructor ({ delegate } = {}) {
    if (delegate) {
      this.delegate = delegate;
    }

    this.isSubscribed = false;
    this.regist();
  }

  regist () {
    navigator.serviceWorker.register('/sw.js')
      .then(swReg => {
        this.register = swReg;
        this.initializePushManager();
      })
      .catch(error => console.error('Service Worker Error', error));
  }

  initializePushManager () {
    this.register.pushManager.getSubscription()
      .then(subscription => {
        this.isSubscribed = !(subscription === null);
        console.log(this.isSubscribed ? 'User IS subscribed.' : 'User is NOT subscribed.');
        this.updateSubscriptionOnServer({ subscription });

        if (!this.isSubscribed) {
          this.subscription();
        }
      });
  }

  changeSubscribed () {
    if (this.isSubscribed) {
      this.unsubscription();
      return;
    }

    this.subscription();
  }

  subscription () {
    const applicationServerKey = urlBase64ToUint8Array(applicationServerPublicKey);
    this.register.pushManager.subscribe({
      userVisibleOnly: true,  // magic for Google Chrome
      applicationServerKey
    }).then(subscription => {
      console.log('User is subscribed:', subscription);
      this.updateSubscriptionOnServer({ subscription });
      this.isSubscribed = true;
    }).catch(err => {
      console.log('Failed to subscribe the user: ', err);
    });
  }

  unsubscription () {
    this.register.pushManager.getSubscription()
      .then(subscription => {
        if (subscription) {
          subscription.unsubscribe();
        }
      })
      .catch(error => console.log('Error unsubscribing', error))
      .then(() => {
        this.updateSubscriptionOnServer({ subscription: null });
        console.log('User is unsubscribed.');
        this.isSubscribed = false;
      });
  }

  updateSubscriptionOnServer ({ subscription } = {}) {
    if (subscription && this.delegate && typeof this.delegate.onUpdateSubscription === 'function') {
      this.delegate.onUpdateSubscription({ subscription });
    }
  }
}

export function canUseServiceWorker () {
  return navigator.serviceWorker != null;
}

export function canUsePushNotification () {
  return window.pushManager != null;
}

export function isNotificationDenied () {
  return Notification.permission === 'denied';
}

/*
 * private
 */
function urlBase64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) { // eslint-disable-line no-plusplus
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
