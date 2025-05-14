import React, { Component } from 'react'
import NewsItem from './NewsItem'
export class News extends Component {
  
  constructor(){
    super();
    this.state ={
      articles: [],
      loading:false,
      page:1
}
    }
    async componentDidMount(){
      let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=acf0b6af7c414e35a13bd9ba97e253bf";
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults})

    }
    handlePrevClick = async()=>{
 let url = `https://newsapi.org/v2/everything?q=tesla&from=2025-04-14&sortBy=publishedAt&apiKey=acf0b6af7c414e35a13bd9ba97e253bf&page${this.state.page - 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({articles: parsedData.articles})

      this.setState({
        page: this.state.page-1,
        articles: parsedData.articles
      })
    }
  handleNextClick = async ()=>{
    if(this.stage.page +1 > Math.ceil(this.state.totalResults/20)){

    }else
{
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2025-04-14&sortBy=publishedAt&apiKey=acf0b6af7c414e35a13bd9ba97e253bf&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({articles: parsedData.articles})

      this.setState({
        page: this.state.page+1,
        articles: parsedData.articles
      })
    }
  }
  render() {
    return (
      <div className="container my-3">
        <h2>News-Awake Top Headlines</h2>
        < div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
      </div>
        })}
       
        </div>
        <div className="container d-flex justify-content=between">
          <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onclick={this.handlePrevClick}>&larr;Previous</button>
          <button type="button" className="btn btn-dark" onclick={this.handleNextClick}>Next &rarr;</button>
        </div>
        </div>
        
    )
  }
}


export default News
