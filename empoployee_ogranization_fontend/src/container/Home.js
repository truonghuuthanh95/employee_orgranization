import React, { Component } from "react";
import Header from "../component/Header";
import { Link } from "react-router-dom";
class Home extends Component {
  
  render() {
    return (
      <div>
        <Header />
        <h3 className="text-center checkIDBox">
          <Link to="/hosoungtuyen">CẬP NHẬT HỒ SƠ ỨNG TUYỂN NHẤN VÀO ĐÂY</Link>
          
        </h3>
        <h3><Link to="/quanlyungvien">CẬP NHẬT HỒ SƠ ỨNG TUYỂN NHẤN VÀO ĐÂY</Link></h3>
      </div>
    );
  }
}

export default Home;
