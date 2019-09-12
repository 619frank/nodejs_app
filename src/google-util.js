
//import { google } from '../node_modules/googleapis';
const {google} = require('../node_modules/googleapis');

const googleConfig = {
  clientId: '780769733453-of4mjamgp6c5jvcm1sigq5n1q16g8ett.apps.googleusercontent.com',
  clientSecret: 'nnOkbK0ppT9b5Z9TpIlsgvMd', 
  redirect: 'https://https://90624caf.ngrok.io/google-auth' // this must match your google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}
/**
 * This scope tells google what information we want to request.
 */
const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.email',
];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}

/**
 * Create the google url to be sent to the client.
 */
function urlGoogle() {
  const auth = createConnection(); // this is from previous step
  const url = getConnectionUrl(auth);
  return url;
}

module.exports = {
   urlGoogle 
}
