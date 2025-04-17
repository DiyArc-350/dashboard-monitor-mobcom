import React from "react";
import "./NavBar.css";


const NavBar = () => {
  const handleHomeClick = () => {
    document.getElementById("profile").scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  const handleProfileClick = () => {
    document.getElementById("profile").scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDescriptionClick = () => {
    document.getElementById("description").scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleMonitoringClick = () => {
    document.getElementById("monitoring").scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav>
      <div className="logo2" href="index.html">
        <img  alt="Logo Better" />
      </div>

      <div>
        <ul id="navbar">
          <li><a href="#home" onClick={handleHomeClick}>HOME</a></li>
          <li><a href="#profile" onClick={handleProfileClick}>PROFILE</a></li>
          <li><a href="#description" onClick={handleDescriptionClick}>DESCRIPTION</a></li>
          <li><a href="#monitoring" onClick={handleMonitoringClick}>MONITORING</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;