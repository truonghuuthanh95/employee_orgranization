import React, { Component } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  Col,
  ControlLabel,
  Button,
  Panel,
  HelpBlock
} from "react-bootstrap";
import Header from "../component/Header";
class CashierExportBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifyCard: "",
      isvalidIdentifyCard: true,
      candidateName: "",
      registrationPrice: "",
      errorIdentifyCard: "",
      errorCandidateName: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitCheckIndentifyCard = this.handleSubmitCheckIndentifyCard.bind(
      this
    );
    this.handelClickPrintBill = this.handelClickPrintBill.bind(this);
  }
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
    if (this.state.identifyCard === "") {
      this.setState({ errorIdentifyCard: "Số CMND không được bỏ trống!" });
    }
  }
  handelClickPrintBill(event) {
    event.preventDefault();
    if (this.state.candidateName === "") {
      this.setState({ errorCandidateName: "Vui lòng điền tên người đăng kí" });
    }else{
      this.setState({errorCandidateName: ''})
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Col sm={8} smOffset={2}>
          <div className="text-center checkIDBox">
            <Form inline onSubmit={this.handleSubmitCheckIndentifyCard}>
              <p className="text-warning">
                Vui lòng nhập số chứng minh nhân dân sau đó nhấn xác nhận để hệ
                thống kiểm tra
              </p>
              <p className="text-danger">{this.state.errorIdentifyCard}</p>
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
          </div>{" "}
          {this.state.isvalidIdentifyCard ? (
            <Col sm={8} smOffset={2} className="exportBillBox">
              <Panel>
                <Panel.Body>
                  {/* <div className="hidden"> */}
                  <form>
                    <FormGroup
                      controlId="formBasicText"
                      validationState={
                        this.state.errorCandidateName !== ''
                          ? "error"
                          : null
                      }
                    >
                      <ControlLabel>Họ tên người đăng kí</ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.candidateName}
                        placeholder="Họ tên người đăng kí"
                        onChange={this.handleInputChange}
                        name="candidateName"
                      />
                      <FormControl.Feedback />
                      <HelpBlock>{this.state.errorCandidateName}</HelpBlock>
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Lệ phí</ControlLabel>
                      <FormControl.Static>30.0000 VND</FormControl.Static>
                    </FormGroup>
                  </form>
                  {/* adsad</div> */}
                </Panel.Body>

                <Panel.Footer>
                  <Button
                    block
                    bsStyle="primary"
                    onClick={this.handelClickPrintBill}
                  >
                    Xuất hóa đơn
                  </Button>
                </Panel.Footer>
              </Panel>
            </Col>
          ) : null}
        </Col>
      </div>
    );
  }
}

export default CashierExportBill;
