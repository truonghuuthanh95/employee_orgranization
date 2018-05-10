import React, { Component } from "react";
import Header from "../component/Header";
import {
  Col,
  Panel,
  Form,
  FormControl,
  ControlLabel,
  FormGroup,
  Button,
  Label,
  Glyphicon,
  Row
} from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
class RegistrationInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: [],
      month: [],
      year: [],
      yearOfBirthSelected: moment().year() - 40,
      monthOfBirthSelected: 1,
      dayOfBirthSelected: 1,
      genderSeleted: 1,
      isValidIdentifyCard: false,
      candidateName: "",
      identifyCard: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeIdentifyCard = this.handleChangeIdentifyCard.bind(this);
  }
  componentWillMount() {
    //init year of birth to select
    for (
      let index = moment().year() - 40;
      index < moment().year() - 20;
      index++
    ) {
      let year = { id: index };
      this.setState(prevous => {
        year: prevous.year.push(year);
      });
    }
    //init day to select
    for (let index = 1; index <= 31; index++) {
      let day = { id: index };
      this.setState(prevous => {
        month: prevous.day.push(day);
      });
    }
    //init month to select
    for (let index = 1; index <= 12; index++) {
      let month = { id: index, value: `Tháng ${index}` };
      this.setState(prevous => {
        day: prevous.month.push(month);
      });
    }
  }
  componentDidMount() {}

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmitCheckIndentifyCard(event) {
    event.preventDefault();
  }
  handleChangeIdentifyCard() {
    this.setState({ isValidIdentifyCard: false });
  }
  handleSubmitRegistrationInterview(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <Header />
        <Col sm={8} smOffset={2}>
          {/* after valid identify card, system will change to input infomation to registration interview component */}
          {!this.state.isValidIdentifyCard ? (
            <div className="text-center checkIDBox">
              <Form inline onSubmit={this.handleSubmitCheckIndentifyCard}>
                <p className="text-warning">
                  Vui lòng nhập mã hồ sơ đăng kí trong biên lai và nhập số chứng minh nhân
                  dân sau đó nhấn xác nhận để hệ thống kiểm tra
                </p>
                <FormGroup controlId="formInlineName">
                  <ControlLabel>Mã</ControlLabel>{" "}
                  <FormControl type="number" placeholder="Mã đăng kí" />
                </FormGroup>{" "}
                <FormGroup controlId="formInlineEmail">
                  <ControlLabel>Số CMND</ControlLabel>{" "}
                  <FormControl
                    type="number"
                    placeholder="CMND"
                    name="identifyCard"
                    value={this.state.identifyCard}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>{" "}
                <Button type="submit" bsStyle="success">
                  Xác nhận
                </Button>
              </Form>
            </div>
          ) : (
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Đăng kí</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <p className="text-center text-warning">
                  Số CMND 0123123123 hợp lệ để đăng kí. Vui lòng điền thông tin
                  theo thứ tự
                </p>
                <form>
                  <Row>
                    <Col sm={8}>
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>
                          1.Họ và tên{" "}
                          <Label bsClass="text-danger">
                            <Glyphicon glyph="star" />
                          </Label>
                        </ControlLabel>
                        <FormControl
                          type="text"
                          placeholder="Họ và tên"
                          name="candidateName"
                          value={this.state.candidateName}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={4}>
                      <FormGroup>
                        <ControlLabel>2.Số CMND</ControlLabel>
                        <FormControl.Static>
                          02131273971{" "}
                          <a onClick={this.handleChangeIdentifyCard}>
                            Thay đổi
                          </a>
                        </FormControl.Static>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={8}>
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>3.Ngày tháng năm sinh</ControlLabel>

                        <Row>
                          <Col sm={2} xs={5}>
                            <FormControl
                              componentClass="select"
                              name="dayOfBirthSelected"
                              onChange={this.handleInputChange}
                              value={this.state.dayOfBirthSelected}
                            >
                              {this.state.day.map(day => (
                                <option key={day.id} value={day.id}>
                                  {day.id}
                                </option>
                              ))}
                            </FormControl>
                          </Col>
                          <Col sm={4} xs={8}>
                            <FormControl
                              componentClass="select"
                              name="monthOfBirthSelected"
                              onChange={this.handleInputChange}
                              value={this.state.monthOfBirthSelected}
                            >
                              {this.state.month.map(month => (
                                <option key={month.id} value={month.id}>
                                  {month.value}
                                </option>
                              ))}
                            </FormControl>
                          </Col>
                          <Col sm={3} xs={6}>
                            <FormControl
                              componentClass="select"
                              name="yearOfBirthSelected"
                              onChange={this.handleInputChange}
                              value={this.state.yearOfBirthSelected}
                            >
                              {this.state.year.map(years => (
                                <option key={years.id} value={years.id}>
                                  {years.id}
                                </option>
                              ))}
                            </FormControl>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col sm={2} xs={6}>
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>4.Giới tính</ControlLabel>
                        <FormControl
                          componentClass="select"
                          value={this.state.genderSeleted}
                          onChange={this.handleInputChange}
                          name="genderSeleted"
                        >
                          <option value="1">Nam</option>
                          <option value="0">Nữ</option>
                        </FormControl>
                      </FormGroup>
                    </Col>
                  </Row>
                </form>
              </Panel.Body>
            </Panel>
          )}
        </Col>
      </div>
    );
  }
}

export default RegistrationInterview;
