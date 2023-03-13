import React, { useReducer, createContext, useMemo } from "react";
import { Reducer } from "./reducer";

import { client } from "../api";

import {
  SET_LOADING,
  FETCH_APPS,
  SET_ERROR,
} from "./types";

const InitialState = {
  loading: false,
  data: null,
  app: { name: "", token: "" },
};

export const InstagramContext = createContext(InitialState);

export const InstagramState = ({ children }) => {

  const [state, dispatch] = useReducer(Reducer, InitialState);

  const setLoading = () => dispatch({ type: SET_LOADING });

  const getUserApps = async () => {
    try {
      const { data } = await client.get("/apps/userapps");
      return dispatch({
        type: FETCH_APPS,
        payload: {
          apps: data,
          activeApp: data.filter((e) => e.is_default)[0],
        },
      });
    } catch (err) {
      throw err;
    }
  };

  const setError = (message) => {
    return dispatch({ type: SET_ERROR, payload: message });
  };

  // memoize the full context value
  const contextValue = useMemo(
    () => ({
      state: state,
      setLoading,
      setError,
      getUserApps,
    }),
    // eslint-disable-next-line
    [state]
  );

  return (
    <InstagramContext.Provider value={contextValue}>
      {children}
    </InstagramContext.Provider>
  );
};
