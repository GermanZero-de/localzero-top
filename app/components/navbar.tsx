/*
Navbar component.
Raw version since it wont be implemented in the real site.
*/

import React from 'react';
import Image from 'next/image';
import '../styles/navbar.scss';
import logo from '../photos/logo.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Image src={logo} alt="LocalZero Logo" className="logo-image" />
        <div className="logo-text-container">
          <span className="logo-text">LocalZero</span>
          <span className="logo-subtext">TOP-Maßnahmen</span>
        </div>
      </div>
      <div className="navbar-links">
        <a href="#about">ÜBER LOCALZERO</a>
        <a href="#monitoring">MONITORING</a>
        <a href="#klimaweg">KLIMAWEG</a>
      </div>
      <button className="donate-button">JETZT SPENDEN</button>
    </div>
  );
};

export default Navbar;
