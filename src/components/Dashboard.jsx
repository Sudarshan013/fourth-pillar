import { Button,Card,H5 } from "@blueprintjs/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import main from "./main";
import Navbar from "./Navbar";
export default class Dashboard extends Component {
  async componentDidMount() {
    this.setState({id:this.props.match.params.id})
    await this.loadNews();
  }

  handleNewArticle=()=>{
    this.props.history.replace({pathname:`/dashboard/${this.state.id}/new`,state:{id:this.state.id}})
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
      const res = {
        title:newsObj.title,
        id: newsObj.id,
        desc: newsObj.descreption,
        ts: newsObj.timestamp,
        categories: newsCategories,
        tags: newsTags,
        img: newsImg,
      };
      this.setState({ news: [...this.state.news, res] });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      news: [],
      id:''
    };
  }


  render() {
    return (
      <div>
        <Navbar>
          <div className="nav__link">

              <Button minimal rightIcon="add" onClick={this.handleNewArticle} >
                Create New article
              </Button>

          </div>
        </Navbar>
        <h1>Dashboard</h1>
        {this.state.news.map((val, key) => {
          return (
            <Card>
              <H5>{val.id}</H5>
              <br />
              <p>{'Title: '+val.title}</p>
              <p>{"description: " + val.desc}</p>
              <p>{"timestamp: " + val.ts}</p>
              <p>{"Categories: " + val.categories}</p>
              <p>{"Tags: " + val.tags}</p>
              <img src={"https://ipfs.infura.io/ipfs/"+val.img}/>
              <hr />
            </Card>
          );
        })}
      </div>
    );
  }
}
