import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { getAllCandidateRegistedByManagementUnitId } from "../api/employeeOgranizationAPI";
import Header from "../component/Header";

class StatusregistrationInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      registrationInterviews: {},
      registedQuantity: "",
      registrationCompleted: "",
      registrationInProcess: ""
    };
  }
  componentDidMount() {
    // const user = JSON.parse(sessionStorage.getItem("user"));
    // if (user !== null) {
    //   this.setState({ user: user });
    // }

    // await getAllCandidateRegistedByManagementUnitId(res => {
    //     const registrationCompleted = res.Results.filter(registrationInterview => registrationInterview.CurrentLivingAddress.HouseNumber !== null);
    //     const registrationInProcess = res.Results.filter(registrationInterview => registrationInterview.CurrentLivingAddress.HouseNumber == null)
    //     this.setState({registrationInterviews : res.Results, registedQuantity: res.Results.length, registrationCompleted: registrationCompleted, registrationInProcess: registrationInProcess});

    // });

    
  }
  render() {
    return (
      <div>
        <Header />
        <Row>
          <Col sm={2} />
        </Row>
      </div>
    );
  }
}

export default StatusregistrationInterview;
