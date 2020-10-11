import React, { Component } from 'react'
import main from './main'
import web3 from './web3'
export default class Dashboard extends Component {

  async componentDidMount() {
    await this.loadNews()
  }

  loadNews=async()=>{
    const count=await main.methods.getTopCount().call()
    this.setState({cnt:count})
    for(var itr=0;itr<count;itr++){
    const newsID=await main.methods.topTen(itr).call()
    const newsObj=await main.methods.newsById(newsID).call()
    const newsCategories=await main.methods.getCategories(newsID).call()
    const newsTags=await main.methods.getTagged(newsID).call()
    const res={id:newsObj.id,desc:newsObj.descreption,ts:newsObj.timestamp,categories:newsCategories,tags:newsTags}
    this.setState({news:[...this.state.news,res]})
  }
  }

  constructor(props) {
     super(props)
     this.state = {
       cnt:0,
        id:'',
        name:'',
        aadhaar:0,
        desc:'',
        nid:'',
        categories:[],
        tagged:[],
        news:[]
     }
   }

   createNews=async(event)=>{
     event.preventDefault()
     const a=await web3.eth.getAccounts()
     await main.methods.createNews(this.state.id,Date.now().toString(),this.state.desc,this.state.nid,this.state.categories,this.state.tagged).send({from:a[0]})
   }

  render() {
    return (
      <div>
        Dashboard
          <form onSubmit={this.createNews}>
          <input type="text" placeholder="Author ID" value={this.state.id} onChange={(event)=>{this.setState({id:event.target.value})}}/>
          <input type="text" placeholder="News ID" value={this.state.nid} onChange={(event)=>{this.setState({nid:event.target.value})}}/>
          <input type="text" placeholder="Description" value={this.state.desc} onChange={(event)=>{this.setState({desc:event.target.value})}}/>
          <input type="text" placeholder="Categories" value={this.state.categories} onChange={(event)=>{this.setState({categories:event.target.value.split(',')})}}/>
          <input type="text" placeholder="Tagged People" value={this.state.tagged} onChange={(event)=>{this.setState({tagged:event.target.value.split(',')})}}/>
          <input type="submit" name="Post News"/>
          </form>
          <hr/>
          {this.state.news.map((val,key)=>{
          return(<div>
            <h1>{val.id}</h1><br/>
            <p>{'description: '+val.desc}</p>
            <p>{'timestamp: '+val.ts}</p>
            <p>{'Categories: '+val.categories}</p>
            <p>{'Tags: '+val.tags}</p>
            <hr/>
            </div>)
          })}
      </div>
    )
  }
}
