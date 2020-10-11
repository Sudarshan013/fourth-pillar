import { Button } from '@blueprintjs/core'
import React from 'react'
import web3 from './web3'
import { NavLink } from 'react-router-dom'

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

class HomeNavbarActions extends React.Component{


  state = {
     account: null,
     web3: undefined,
   };

   loadBlockchain = async () => {
     this.setState({ web3 });
     const accounts = await web3.eth.getAccounts();
     console.log(accounts);
     this.setState({ account: accounts[0] });
     this.handleAccessToDashboard(accounts[0])
   };

   handleAccessToDashboard = (account) => {
     this.props.history.push(`dashboard/${account}`)
   }

  render(){
  let { account, web3 } = this.state;
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
      <Button
       intent={
         web3 === undefined ? "none" : "success"
       }
       onClick={this.loadBlockchain}
       large={true}
     >
       {web3 === undefined
         ? "Connect Blockchain"
         : "Connected to Blockchain"}
      </Button>
      </div>
    </>
  );
}

}
export default HomeNavbarActions;
