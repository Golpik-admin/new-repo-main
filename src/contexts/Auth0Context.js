import { createContext, useEffect, useReducer, useState } from "react";
import { Auth0Client } from "@auth0/auth0-spa-js";

import { auth0Config } from "../config";
import axios from "axios";

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

let auth0Client = null;

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  if (action.type === INITIALIZE) {
    const { isAuthenticated, user, token } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      token,
    };
  }
  if (action.type === SIGN_IN) {
    const { user } = action.payload;
    return { ...state, isAuthenticated: true, user };
  }
  if (action.type === SIGN_OUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      token: null,
    };
  }
  return state;
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const parseQuerystring = () => {
    var url = window.location.href,
      retObject = {},
      parameters;

    if (url.indexOf("?") === -1) {
      return null;
    }

    url = url.split("?")[1];

    parameters = url.split("&");

    for (var i = 0; i < parameters.length; i++) {
      retObject[parameters[i].split("=")[0]] = parameters[i].split("=")[1];
    }

    return retObject;
  };
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      const queryStrings = parseQuerystring();
      const subscriptionUrl = queryStrings && queryStrings.subscription;
      try {
        auth0Client = new Auth0Client({
          client_id: auth0Config.clientId || "",
          domain: auth0Config.domain || "",
          redirect_uri:
            window.location.origin + "?subscription=" + subscriptionUrl,
        });
        const code = queryStrings && queryStrings.code;
        const state = queryStrings && queryStrings.state;
        if (code && state) {
          await auth0Client.handleRedirectCallback();
        }
        // await auth0Client.checkSession();

        const isAuthenticated = await auth0Client.isAuthenticated();

        if (isAuthenticated) {
          const user = await auth0Client.getUser();
          // const getTokenSilently = await auth0Client.getTokenSilently({
          //   detailedResponse: true,
          // });
          // sessionStorage.setItem("access_token", getTokenSilently.access_token);
          setLoading(false);
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated,
              user: user || null,
              // token: getTokenSilently.id_token || null,
            },
          });
        } else {
          setLoading(false);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated, user: null, token: null },
          });
        }
      } catch (err) {
        setLoading(false);
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null, token: null },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async () => {
    await auth0Client?.loginWithRedirect();
    const isAuthenticated = await auth0Client?.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0Client?.getUser();
      const getTokenSilently = await auth0Client.getTokenSilently({
        detailedResponse: true,
      });
      sessionStorage.setItem("access_token", getTokenSilently.access_token);
      dispatch({
        type: SIGN_IN,
        payload: {
          user: user || null,
          token: getTokenSilently.id_token || null,
        },
      });
    }
  };

  const getApiToken = () => {
    return new Promise(function (resolve, reject) {
      var data = {
        client_id: "tZ9FEWfQim4Y1fcg4OarjXQ4zxHFnedY",
        client_secret: auth0Config.clientSecret,
        audience: `${auth0Config.domain}/api/v2/`,
        grant_type: auth0Config.grantType,
      };

      var config = {
        method: "post",
        url: `${auth0Config.domain}/oauth/token`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .post(config?.url, config?.data, config?.headers)
        .then(function (response) {
          resolve(response?.data?.access_token);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };
  const getUserMeta = (token, userId) => {
    return new Promise(function (resolve, reject) {
      var config = {
        method: "get",
        url: `${auth0Config.domain}/api/v2/users/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  const getUserInfo = async () => {
    const getTokenSilently = sessionStorage.getItem("access_token");
    return new Promise(async function (resolve, reject) {
      var qs = require("qs");
      var data = qs.stringify({});
      var config = {
        method: "get",
        url: `${auth0Config.domain}/userinfo`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenSilently}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  const signOut = (localOnly = false) => {
    auth0Client?.logout({
      localOnly: localOnly,
    });
    dispatch({
      type: SIGN_OUT,
      payload: { isAuthenticated: false, user: null, token: null },
    });
    sessionStorage.removeItem("access_token");
  };

  const resetPassword = (email) => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "auth0",
        user: {
          user: state?.user,
          id: state?.user?.sub,
          avatar: state?.user?.picture,
          email: state?.user?.email,
          displayName: state?.user?.nickname,
          token: state?.token,
          role: "user",
        },
        signIn,
        signOut,
        resetPassword,
        setLoading,
        getUserInfo,
        getApiToken,
        getUserMeta,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
