import React, { useState } from "react";
import axios from "./axios-global";

const initialState = {
  alert: {
    status: false,
    type: "",
    msg: "",
  },
  land: {
    tableLoading: false,
    usStateName: "",
    usStateAbbv: "",
    countyName: "",
    countyId: null,
  },
  user: {
    loggedIn: false,
    adminName: "",
  },
};

export const Context = React.createContext();

const Store = ({ children }) => {
  const [store, setStore] = useState(initialState);
  const token = localStorage.getItem("token");
  if (!store.user.loggedIn && token) {
    axios
      .get("/users")
      .then((res) => {
        store.user = { loggedIn: true, adminName: res.data.user.name };
        setStore({ ...store });
      })
      .catch((err) => {
        if (err?.response?.data?.action === "remove-token") {
          localStorage.removeItem("token");
        }
        console.error(err);
      });
  }
  return <Context.Provider value={[store, setStore]}>{children}</Context.Provider>;
};

export default Store;
