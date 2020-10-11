import { Button,Card,H5,Tag,AnchorButton } from "@blueprintjs/core";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import main from "./main";
import web3 from './web3';
import Navbar from "./Navbar";
const RenderItems = ({news,tipAuthor,loading,author,handleNewArticle}) => {
  if (news.length === 0) {
    return (
      <div class="bp3-non-ideal-state">
        <div class="bp3-non-ideal-state-visual">
          <span class="bp3-icon bp3-icon-search-template"></span>
        </div>
        <h4 class="bp3-heading">Seems like there is no article found</h4>
        <div>Seems like there is no article found, Create a new article </div>
        <Button intent="primary" style={{ marginBottom: '20px' }} rightIcon="add" onClick={handleNewArticle} >
          Create New article
        </Button>
      </div>
    )
  }
  return news.map((val, index) => {
    return (
      <Card key={index}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <H5>{val.id}</H5>
          <Tag intent="primary" minimal>{parseInt(val.amountInAuthorsAccount) + " Wei"}</Tag>
        </div>
        <br />
        <p>{'Title: ' + val.title}</p>
        <p>{"description: " + val.desc}</p>
        <p>{"timestamp: " + val.ts}</p>
        <p>{"Categories: " + val.categories}</p>
        <p>{"Tags: " + val.tags}</p>
        <img src={"https://ipfs.infura.io/ipfs/" + val.img} /><br />
        <Button className="mt-10" intent="warning" onClick={() => { tipAuthor(val.author) }} loading={loading && val.author == author}>Tip 100 Wei</Button>
        <hr />
      </Card>
    );
  })
}
export default class Dashboard extends Component {
  async componentDidMount() {
    this.setState({id:this.props.match.params.id})
    if(web3!=="Not_Found"){
    await this.loadNews();
  }
  }
  handleNewArticle=()=>{
    this.props.history.replace({pathname:`/dashboard/${this.state.id}/new`,state:{id:this.state.id}})
  }
  tipAuthor= async (receiver)=>{
    this.setState({loading:true,author:receiver})
    const a = await web3.eth.getAccounts();
    await main.methods.tipAccount(this.state.id,receiver).send({from:a[0],value:100},()=>{
      this.setState({loading:false,author:''})
    }
  )
  }
  loadNews = async () => {
    const count = await main.methods.getTopCount().call();
    this.setState({ cnt: count });
    for (var itr = 0; itr < count; itr++) {
      const newsID = await main.methods.topTen(itr).call();
      const newsObj = await main.methods.newsById(newsID).call();
      const newsCategories = await main.methods.getCategories(newsID).call();
      const newsTags = await main.methods.getTagged(newsID).call();
      const newsImg = await main.methods.newsImages(newsID,0).call();
      const account = await main.methods.accounts(newsObj.author).call()
      const res = {
        title:newsObj.title,
        id: newsObj.id,
        desc: newsObj.descreption,
        ts: newsObj.timestamp,
        categories: newsCategories,
        tags: newsTags,
        img: newsImg,
        author: newsObj.author,
        amountInAuthorsAccount: account.received,
      };
      this.setState({ news: [...this.state.news, res] });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      id:'',
      loading:false,
      author:''
    };
  }
  render() {
    const disableSystem=web3==="Not_Found"
    return (
      <div>
        <Navbar>
          <div className="nav__link">
          <Button minimal disabled={disableSystem} rightIcon="add" onClick={this.handleNewArticle} >
            Create New article
          </Button>
          </div>
        </Navbar>
        <div className="container">
          {disableSystem ?
            <div class="bp3-non-ideal-state">
              <div class="bp3-non-ideal-state-visual">
                <span class="bp3-icon bp3-icon-error"></span>
              </div>
              <h4 class="bp3-heading">Seems like there is no Metamask</h4>
              <div>Feel free to install Metamask and join us in building the Fourth Pillar </div>
              <AnchorButton intent="primary" style={{ marginBottom: '20px' }} rightIcon="add" href="https://meet.google.com/linkredirect?authuser=0&dest=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fmetamask%2Fnkbihfbeogaeaoehlefnkodbefgpgknn%3Fhl%3Den" >
                Install Metamask in Browser
            </AnchorButton>
            </div>
            :
            (
              <Fragment>
                <h1>Dashboard</h1>
                <RenderItems
                  news={this.state.news}
                  tipAuthor={this.tipAuthor}
                  loading={this.state.loading}
                  handleNewArticle={this.handleNewArticle}
                  author={this.state.author}
                />
              </Fragment>
            )
          }
        </div>
      </div>
    );
  }
}
