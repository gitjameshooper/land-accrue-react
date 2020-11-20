import React, { useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Context } from "./../../store";
import "./alert.scss";

export default function Alert() {
  const [store, setStore] = useContext(Context);
  useEffect(() => {
    if (store.alert.status) {
      setTimeout(() => {
        setStore({ ...store, alert: { status: false, type: "", msg: "" } });
      }, 3000);
    }
  });

  return (
    <Typography
      variant="body1"
      component="p"
      className={`alert-component ${store.alert.status ? "active" : "hidden"} ${store.alert.type}`}>
      <span>{store.alert.msg}</span>
    </Typography>
  );
}
