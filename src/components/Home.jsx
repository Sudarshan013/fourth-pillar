import React, { Fragment } from 'react'
import HomeNavbarActions from './HomeNavbarActions'
import Navbar from './Navbar'
import HeroImage from "../static/images/9_BLM_SIGNS.svg"
import "../styles/home.scss"

export default function Home() {
  return (
    <Fragment>
      <Navbar>
        <HomeNavbarActions />
      </Navbar>
      <div className="hero__section">
        <div className="hero__img_section">
          <img src={HeroImage} alt="hero_logo" />
        </div>
        <div className="hero__content__section">
          <h1>Heading</h1>
          <p>Caption</p>
        </div>
      </div>
    </Fragment>
  );
}
