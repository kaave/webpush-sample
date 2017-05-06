import webpush from 'web-push';
import URLSafeBase64 from 'urlsafe-base64';
import dotenv from 'dotenv';

dotenv.config();

const pushSubscription = {
  endpoint: process.env.PUSH_ENDPOINT,
  keys: {
    p256dh: process.env.PUSH_P256DH,
    auth: process.env.PUSH_AUTH
  }
};
const sendData = JSON.stringify({ data: 'Hello Nagoya.js!!!!!!!!!!!!!!!!!!!!!!' });
const publicKey = URLSafeBase64.encode('BIxbTMDKpqsEIv4GURJFIvacn0ojx6hVm66_bpYyvBpqlrW16hNboNE6yFcKNGsa-3ept34Jy-BNB6ftjwSpJVE');
const privateKey = URLSafeBase64.encode('baG5zFzd027eHcz73DHxIl-7QazxY248R_CN_6b0e0E');

webpush.sendNotification(pushSubscription, sendData, {
  vapidDetails: {
    publicKey,
    privateKey,
    subject: 'mailto:abe@framelunch.jp'
  }
});
