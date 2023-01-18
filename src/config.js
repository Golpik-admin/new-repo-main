export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const auth0Config = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  clientSecret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
  grantType: process.env.REACT_APP_AUTH0_GRANT_TYPE,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
};
export const authTdameritrade = {
  URL: process.env.REACT_APP_AUTH_TDAMERITRADE,
  clientId: process.env.REACT_APP_AUTH_TDAMERITRADE_CLIENTID,
};

export const cognitoConfig = {
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

export const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
export const appUrl = process.env.REACT_APP_URL;
export const stripeapiEndpoint = process.env.REACT_APP_STRIPE_API_ENDPOINT;

export const stripePublishKey = process.env.REACT_APP_API_STRIPE_PUBLISH_KEY;
export const stripeSecretKey = process.env.REACT_APP_API_STRIPE_SECRET_KEY;
