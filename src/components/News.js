import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class news extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async UpdateNews() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54ef85f0c7e644549cae776abc70c9b6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  async componentDidMount() {
    this.UpdateNews();
  };
  handlePrev = async () => {
    console.log("clicked Previous");
    this.setState({ page: this.state.page - 1 });
    this.UpdateNews();
  };
  handleNext = async () => {
    console.log("clicked next");
    this.setState({ page: this.state.page + 1 });
    this.UpdateNews();
  };

  fetchMoreData= async()=>{
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=54ef85f0c7e644549cae776abc70c9b6&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({
      page:this.state.page+1
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{marginTop: "4rem"}}>Top-{this.props.category}  Headlines By News-Express</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4><Spinner/></h4>}
        >
          <div className="row text-center m-3 ">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col md-3" key={element.url}>
                    <NewsItem
                      title={element.title}
                      discription={element.description}
                      imgUrl={element.urlToImage}
                      Url={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </InfiniteScroll>
        {/* <div className="container">
          <div className="d-flex justify-content-between mb-2">
            <button
              className="btn btn-dark"
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePrev}
            >
              &lArr; Previous
            </button>
            <button
              className="btn btn-dark"
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              onClick={this.handleNext}
            >
              Next &rArr;
            </button>
          </div>
            </div> */}
      </>
    );
  }
}

export default news;
