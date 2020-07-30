import React, { Component } from 'react';

import Header from "../../components/header";
import Footer from "../../components/footer";

class HomePage extends Component {
  render() {
    return (
      
      <div>
        <Header/>
        <div className="container-fluid">
          <div className="container">
            <div className="page-container">HomePage</div>
          </div>
        </div>

        <Footer/>
      </div>
      
      );
  }
}

export default HomePage;
