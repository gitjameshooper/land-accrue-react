import React, { useState } from "react";
import axios from "axios";

const initialState = {
  user: {
    loggedIn: false,
    adminName: "",
  },
  land: {
    tableLoading: false,
    usStateName: "",
    usStateAbbv: "",
    countyName: "",
    countyId: null,
  },
};

export const Context = React.createContext();

const Store = ({ children }) => {
  const [store, setStore] = useState(initialState);
  let token = localStorage.getItem("token");
  if (!store.user.loggedIn && token) {
    let config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
    };
    axios
      .get("http://localhost:5000/users", config)
      .then((res) => {
        store.user = { loggedIn: true, adminName: res.data.user.name };
        setStore({ ...store });
      })
      .catch((err) => {
        console.log(err);
        // console.error(`${err.response.status}: ${err.response.data.msg}`);
      });
  }
  return <Context.Provider value={[store, setStore]}>{children}</Context.Provider>;
};

export default Store;
