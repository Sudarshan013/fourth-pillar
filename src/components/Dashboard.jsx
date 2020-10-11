import { Button,Card,H5 } from "@blueprintjs/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import main from "./main";
import Navbar from "./Navbar";
import web3 from "./web3";
export default class Dashboard extends Component {
  async componentDidMount() {
    await this.loadNews();
  }

  loadNews = async () => {
    const count = await main.methods.getTopCount().call();
    this.setState({ cnt: count });
    for (var itr = 0; itr < count; itr++) {
      const newsID = await main.methods.topTen(itr).call();
      const newsObj = await main.methods.newsById(newsID).call();
      const newsCategories = await main.methods.getCategories(newsID).call();
      const newsTags = await main.methods.getTagged(newsID).call();
      const res = {
        id: newsObj.id,
        desc: newsObj.descreption,
        ts: newsObj.timestamp,
        categories: newsCategories,
        tags: newsTags,
      };
      this.setState({ news: [...this.state.news, res] });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }


  render() {
    return (
      <div>
        <Navbar>
          <div className="nav__link">
            <Link to="/dashboard/new">
              <Button minimal rightIcon="add" >
                Create New article
              </Button>
            </Link>
          </div>
        </Navbar>
        Dashboard
        <hr />
        {this.state.news.map((val, key) => {
          return (
            <Card>
              <H5>{val.id}</H5>
              <br />
              <p>{"description: " + val.desc}</p>
              <p>{"timestamp: " + val.ts}</p>
              <p>{"Categories: " + val.categories}</p>
              <p>{"Tags: " + val.tags}</p>
              <hr />
            </Card>
          );
        })}
      </div>
    );
  }
}
