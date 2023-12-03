const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./creds.json');

const adminApp = initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'testing-project-92c7c.appspot.com'
});

const bucket = getStorage(adminApp).bucket();

module.exports = {bucket};