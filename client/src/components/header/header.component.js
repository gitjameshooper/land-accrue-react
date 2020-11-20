import React from "react";
import "./header.scss";
import NavBar from "./navbar/navbar.component";
import Alert from "./../alert/alert.component";

export default function Header() {
  return (
    <header>
      <Alert />
      <NavBar />
    </header>
  );
}
