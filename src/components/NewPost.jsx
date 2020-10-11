import React, { Component } from 'react'
import web3 from "./web3";
import main from "./main";
import Navbar from './Navbar';


export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      aadhaar: 0,
      desc: "",
      nid: "",
      categories: [],
      tagged: [],
    };
  }

  createNews = async (event) => {
    // event.preventDefault();
    const a = await web3.eth.getAccounts();
    await main.methods
      .createNews(
        this.state.id,
        Date.now().toString(),
        this.state.desc,
        this.state.nid,
        this.state.categories,
        this.state.tagged
      )
      .send({ from: a[0] });
  };
  render() {
    return (
      <div>
          <Navbar/>
          <div className="container">
            <div className="row mt-3">
              <div className="col-12">
                <h3>Add a post</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-10">
                <div className="form-group">
                  <label className="mt-2" htmlFor="exampleInputEmail1">
                    Author ID
                  </label>
                  <input
                    name="schemeName"
                    value={this.state.id}
                    onChange={(event) => {
                      this.setState({ id: event.target.value });
                    }}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Author ID "
                  />

                  <label
                    className="mt-2"
                    className="mt-2"
                    htmlFor="exampleInputEmail1"
                  >
                    News ID
                  </label>
                  <input
                    name="schemeCode"
                    value={this.state.nid}
                    onChange={(event) => {
                      this.setState({ nid: event.target.value });
                    }}
                    className="form-control"
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="Enter news ID"
                  />

                  <label className="mt-2" htmlFor="">
                    Description
                  </label>
                  <input
                    name="ministry"
                    value={this.state.desc}
                    onChange={(event) => {
                      this.setState({ desc: event.target.value });
                    }}
                    className="form-control"
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="Enter Description"
                  />

                  <label className="mt-2" htmlFor="">
                    Categories
                  </label>
                  <input
                    name="Categories"
                    value={this.state.categories}
                    onChange={(event) => {
                      this.setState({
                        categories: event.target.value.split(","),
                      });
                    }}
                    className="form-control"
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="Enter Categories"
                  />

                  <label className="mt-2" htmlFor="">
                    Tagged People
                  </label>
                  <input
                    name="typeOfScheme"
                    value={this.state.tagged}
                    onChange={(event) => {
                      this.setState({
                        tagged: event.target.value.split(","),
                      });
                    }}
                    type="text"
                    className="form-control"
                    id=""
                    aria-describedby="emailHelp"
                    placeholder="Enter Tagged People"
                  />
                <button
                  type="submit"
                  className="mt-10"
                  onClick={this.createNews}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
    );
  }
}
