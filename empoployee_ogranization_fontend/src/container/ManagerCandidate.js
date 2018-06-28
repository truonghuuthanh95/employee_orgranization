import React, { Component } from "react";
import Header from "../component/Header";
import { Row, Col, Panel, Glyphicon, PageHeader } from "react-bootstrap";
import { getAllCandidateRegistedByManagementUnitId } from "../api/employeeOgranizationAPI";
class ManagerCandidate extends Component {
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
  async componentDidMount() {
    // http://api.tuyendung.hcm.edu.vn/api
    fetch("http://api.tuyendung.hcm.edu.vn/api", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ Username: "thanh", Password: "123456" })
    }).then(res => console.log(res.json()));
    fetch("http://api.tuyendung.hcm.edu.vn/abc?user=thanh", {
      method: "POST",
      // headers: {
      //   "content-type": "application/json"
      // },
      // body: JSON.stringify({ Username: "thanh", Password: "123456" })
    }).then(res => console.log(res.json()));
    // const user = JSON.parse(sessionStorage.getItem("user"));
    // if (user !== null) {
    //   this.setState({ user: user });
    // }
    // await getAllCandidateRegistedByManagementUnitId(res => {
    //   const registrationCompleted = res.Results.filter(
    //     registrationInterview =>
    //       registrationInterview.CurrentLivingAddress.HouseNumber !== null
    //   );
    //   const registrationInProcess = res.Results.filter(
    //     registrationInterview =>
    //       registrationInterview.CurrentLivingAddress.HouseNumber == null
    //   );
    //   this.setState({
    //     registrationInterviews: res.Results,
    //     registedQuantity: res.Results.length,
    //     registrationCompleted: registrationCompleted,
    //     registrationInProcess: registrationInProcess
    //   });
    // });
  }
  render() {
    return (
      <div>
        <Header />
        <Col sm={8} smOffset={2}>
          <Row>
            <Col sm={4}>
              <Panel bsStyle="primary">
                <Panel.Heading>
                  <Row>
                    <Col sm={3} xs={3}>
                      <Glyphicon glyph="pushpin" className="status-icon" />
                    </Col>
                    <Col sm={9} xs={9}>
                      <PageHeader className="text-center">30</PageHeader>
                      <h4 className="text-center">ĐÃ ĐĂNG KÍ</h4>
                    </Col>
                  </Row>
                </Panel.Heading>
              </Panel>
            </Col>
            <Col sm={4}>
              <Panel bsStyle="success">
                <Panel.Heading>
                  <Row>
                    <Col sm={3} xs={3}>
                      <Glyphicon glyph="ok" className="status-icon" />
                    </Col>
                    <Col sm={9} xs={9}>
                      <PageHeader className="text-center">30</PageHeader>
                      <h4 className="text-center">HOÀN THÀNH</h4>
                    </Col>
                  </Row>
                </Panel.Heading>
              </Panel>
            </Col>
            <Col sm={4}>
              <Panel bsStyle="danger">
                <Panel.Heading>
                  <Row>
                    <Col sm={3} xs={3}>
                      <Glyphicon glyph="remove" className="status-icon" />
                    </Col>
                    <Col sm={9} xs={9}>
                      <PageHeader className="text-center">30</PageHeader>
                      <h4 className="text-center">CHƯA CẬP NHẬT</h4>
                    </Col>
                  </Row>
                </Panel.Heading>
              </Panel>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

export default ManagerCandidate;
