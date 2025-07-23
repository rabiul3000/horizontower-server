var admin = require("firebase-admin");

// var serviceAccount = require("../config/firebaseServiceKey.json");
// var serviceAccount = require(process.env.FIREBASE_SERVICE_KEY);
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

