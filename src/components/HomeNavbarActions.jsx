import { Button } from '@blueprintjs/core'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function HomeNavbarActions() {
  const centerNavActions = [
    {
      id: "wfp",
      label: "Why Fourth Pillar",
      linkTo: "/",
    },
    {
      id: "about_us",
      label: "About us",
      linkTo: "/about_us",
    },
    {
      id: "community",
      label: "Community",
      linkTo: "/community",
    },
  ];
  return (
    <>
      <div className="nav__link">
        {centerNavActions.map((centerNavAction) => {
          return (<NavLink to={centerNavAction.linkTo} key={centerNavAction.id}>
            <Button minimal>{centerNavAction.label}</Button>
          </NavLink>)
        })}
      </div>
      <div className="nav__link">
        <NavLink to={"/dashboard"}>
          <Button minimal>
            Connect to blockchain
          </Button>
        </NavLink>
      </div>
    </>
  );
}
