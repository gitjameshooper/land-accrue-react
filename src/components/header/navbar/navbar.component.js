import React, { useState, useContext } from "react";
import { Context } from "./../../../store";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import RoomIcon from "@material-ui/icons/Room";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import LandscapeIcon from "@material-ui/icons/Landscape";
import logo from "./../../../assets/img/la-mtn-logo.png";
import "./navbar.scss";

export default function NavBar() {
  const [sideBar, setSideBar] = useState(null);
  const [profile, setProfile] = useState(null);
  const [store, setStore] = useContext(Context);
  const showSideBar = () => setSideBar(!sideBar);
  const showProfile = () => setProfile(!profile);

  const onLogout = (e) => {
    store.user = { loggedIn: false, adminName: "" };
    setStore({ ...store });
    localStorage.removeItem("token");
  };

  return (
    <div className="navbar">
      <Link to="#" className="menu-bars nav-item" onClick={showSideBar}>
        <MenuIcon />
      </Link>
      <span className="la-logo">
        <img src={logo} alt="Logo" />
      </span>
      <nav className={sideBar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSideBar}>
          <li className="navbar-toggle nav-item">
            <CloseIcon />
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <RoomIcon className="icons" />
              <span className="nav-text">
                About<span className="bot-border"></span>
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              <SupervisorAccountIcon className="icons" />
              <span className="nav-text">
                Admin Login<span className="bot-border"></span>
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/land" className="nav-link">
              <LandscapeIcon className="icons" />
              <span className="nav-text">
                Land<span className="bot-border"></span>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      {store.user.loggedIn && (
        <div className="profile">
          <AccountBoxIcon onClick={showProfile} />
          <div className={profile ? "profile-box active" : "profile-box"} onMouseLeave={showProfile}>
            <span className="name-text item">{store.user.adminName}</span>
            <span className="settings-text item hover">Settings</span>
            <span className="logout item hover" onClick={onLogout}>
              Logout
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
