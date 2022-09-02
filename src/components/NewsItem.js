import React, { Component } from 'react'
import notImg from "./broken-image.png"

export class NewsItem extends Component {
  render() {
    let {title,discription,imgUrl,Url,author,date,source}=this.props;
    return (
        <div className="card my-2" style={{width: "18rem"}}>
            <img src={!imgUrl?notImg:imgUrl} alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{discription}</p>
                 <span className="badge text-bg-danger">{source}</span>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a href={Url} className="btn btn-primary">Read More</a>
            </div>
        </div>
    )
  }
}

export default NewsItem