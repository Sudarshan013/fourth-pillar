import {Alignment, Button, Navbar as Nav, NavbarDivider } from '@blueprintjs/core';
import React, { Fragment, memo } from 'react'

export default memo(function Navbar(props) {
  return (
    <Fragment>
      <Nav>
        <Nav.Group>
          <Nav.Heading className="nav__link">Fourth Pillar</Nav.Heading>
          {props.children}
        </Nav.Group>
      </Nav>
    </Fragment>
  );
})
