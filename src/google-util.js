
//import { google } from '../node_modules/googleapis';
const {google} = require('../node_modules/googleapis');

const googleConfig = {
  clientId: '780769733453-hrum78ec8ori8irnddu4glq2d3ihb0cp.apps.googleusercontent.com',
  clientSecret: 'RCZr4DTwNcJpbU3_J51y43t-', 
  redirect: 'https://40531e95.ngrok.io/google-auth' // this must match your google api settings
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
    'https://www.googleapis.com/auth/userinfo.profile'
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
   urlGoogle,getGoogleAccountFromCode 
}
async function getGoogleAccountFromCode(code) {
     
    const auth = createConnection();
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    auth.setCredentials(tokens);
    let decoded = jwtDecode(tokens.id_token)
    return { email : decoded.email, first_name: decoded.given_name, last_name: decoded.family_name,picture:decoded.picture}
   
}

function jwtDecode(token){
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const buff =  Buffer.from(base64, 'base64');
    const payloadinit = buff.toString('ascii');
    const payload = JSON.parse(payloadinit);
    return payload;
}

