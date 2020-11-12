import React, { useContext } from "react";
import { Context } from "./../../../../store";

export default function LoadLandBtn(props) {
  const [store, setStore] = useContext(Context);
  const onShowLandSubmit = () => {
    setStore({
      ...store,
      land: {
        tableLoading: true,
        countyId: props.countyId,
        countyName: props.countyName,
        usStateAbbv: props.usStateAbbv,
      },
    });
  };
  console.log(store.land.countyId);
  return (
    <button className="la-btn" onClick={onShowLandSubmit}>
      Load Land
    </button>
  );
}
