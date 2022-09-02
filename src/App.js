import React, { Component } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,Routes,Route,
} from "react-router-dom";
// import LoadingBar from 'react-top-loading-bar';

export class App extends Component {
  pagesize=8;
  // state={
  //   progress:0
  // }
  // setProgress=(progress)=>{
  //   this.setState({
  //     progress:progress
  //   })
  // }
  render() {
    return (
      <>
   <div>
    <Router>
    <Navbar/>
    {/* <LoadingBar
    color='#f11946'
    progress={this.state.progress}
    /> */}
    <Routes>
      <Route exact path="/" element={<News key="general" pageSize={this.pagesize} country="in" category="general"/>}>
      </Route>
      <Route exact path="/business" element={<News key="business" pageSize={this.pagesize} country="in" category="business"/>}>
      </Route>
      <Route exact path="/entertainment" element={<News  key="entertainment" pageSize={this.pagesize} country="in" category="entertainment"/>}>
      </Route>
      <Route exact path="/health" element={<News key="health" pageSize={this.pagesize} country="in" category="health"/>}>
      </Route>
      <Route exact path="/science" element={<News  key="science" pageSize={this.pagesize} country="in" category="science"/>}>
      </Route>
      <Route exact path="/sports" element={<News  key="sports" pageSize={this.pagesize} country="in" category="sports"/>}>
      </Route>
      <Route exact path="/technology" element={<News key="technology" pageSize={this.pagesize} country="in" category="technology"/>}>
      </Route>
    </Routes>
    </Router>
    </div>
  </>
    )
  }
}

export default App
