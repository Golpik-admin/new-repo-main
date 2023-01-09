import { createContext, useEffect, useReducer, useState } from "react";
import { Auth0Client } from "@auth0/auth0-spa-js";

import { auth0Config } from "../config";

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
    };
  }
  return state;
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      try {
        auth0Client = new Auth0Client({
          client_id: auth0Config.clientId || "",
          domain: auth0Config.domain || "",
          redirect_uri: window.location.origin,
        });

        await auth0Client.checkSession();

        const isAuthenticated = await auth0Client.isAuthenticated();

        if (isAuthenticated) {
          const user = await auth0Client.getUser();
          const getTokenSilently = await auth0Client.getTokenSilently({
            detailedResponse: true,
          });
          console.log(getTokenSilently);
          setLoading(false);
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated,
              user: user || null,
              token: getTokenSilently.id_token || null,
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
    await auth0Client?.loginWithPopup();
    const isAuthenticated = await auth0Client?.isAuthenticated();

    if (isAuthenticated) {
      const user = await auth0Client?.getUser();
      dispatch({
        type: SIGN_IN,
        payload: { user: user || null },
      });
    }
  };

  const signOut = () => {
    auth0Client?.logout();
    dispatch({ type: SIGN_OUT });
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
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
