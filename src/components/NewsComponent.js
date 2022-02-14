// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import News from './News';

export class NewsComponent extends Component {
//   static propTypes = {};
  articles=[
    
  ]
  constructor()
  {
      super();
      this.state={
          articles:this.articles,
          loading:false,
          page:1,
      }
      
  }

  async componentDidMount()
  {
      let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=580b29bc961844d496ef831fa847f709&page=1";
      let data=await fetch(url);
      let parsedData=await data.json();
      this.setState({articles:parsedData.articles})
  }
  handlenextclick= async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=580b29bc961844d496ef831fa847f709&page=${this.state.page+1}`;
    let data=await fetch(url);
    let parsedData=await data.json();

    this.setState({
        page:this.state.page+1,
        articles:parsedData.articles
    })
  }
  handleprevClick= async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=580b29bc961844d496ef831fa847f709&page=${this.state.page-1}`;
    let data=await fetch(url);
    let parsedData=await data.json();

    this.setState({
        page:this.state.page-1,
        articles:parsedData.articles
    })
  }

  render() {
      
    return (
    <div className='container my-3'>
    <center>
    <h2>News-Monkey Top Headlines</h2>
    </center>
    
        <div className='row'>
        {this.state.articles.map((element)=>{
            return(
                <div className='col-md-4' key={element.url}>
            <News  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsurl={element.url}/>
            </div>
            )
            
    })}
        
        </div>
        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handleprevClick}>&larr; Previous</button>
        <button className='btn btn-dark' onClick={this.handlenextclick}>Next &rarr;</button>

        </div>
    </div>
    );
  }
}

export default NewsComponent;
