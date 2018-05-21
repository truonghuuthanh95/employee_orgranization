import React, { Component } from "react";
import {
  getRegistrationPriceByMananagementUnitId,
  checkIdentifyCard,
  createRegistrationInterview,
  getManagementUnitById
} from "../api/cashierAPI";
import ExportBill from "../component/ExportBill";
import ReactToPrint from "react-to-print";
import {
  Form,
  FormControl,
  FormGroup,
  Col,
  ControlLabel,
  Button,
  Panel,
  HelpBlock,
  Row,
  Glyphicon
} from "react-bootstrap";
import Header from "../component/Header";
class CashierExportBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifyCard: "",
      isvalidIdentifyCard: false,
      candidateName: "",
      registrationPrice: "",
      errorIdentifyCard: "",
      errorCandidateName: "",
      priceSelected: "",
      registrationId: "",
      isDisableIdentifyCardInput: false,
      errorCreateRegistrationInterview: "",
      managementUnit: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitCheckIndentifyCard = this.handleSubmitCheckIndentifyCard.bind(
      this
    );
    this.handelClickPrintBill = this.handelClickPrintBill.bind(this);
    this.handelClickCancelAddCandidate = this.handelClickCancelAddCandidate.bind(
      this
    );
  }
  
  async componentDidMount() {
    const account = JSON.parse(sessionStorage.getItem("user"));
    if (account === null) {
      this.props.history.push("/login");
    } else if (account.RoleName !== 'admin' && account.RoleName !== 'cashier') {
      sessionStorage.removeItem('user');
      this.props.history.push("/login");
    }else {
      await getRegistrationPriceByMananagementUnitId(1).then(res =>
        this.setState({ registrationPrice: res })
      );
      await getManagementUnitById(account.ManagementUnitId).then(res => {
        if (res.Status === 200) {
          this.setState({ managementUnit: res.Results });
        }
      });
    }
   
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  async handleSubmitCheckIndentifyCard(event) {
    event.preventDefault();
    if (this.state.identifyCard === "") {
      this.setState({ errorIdentifyCard: "Vui lòng nhập số CMND" });
    } else if (
      this.state.identifyCard.length < 9 ||
      this.state.identifyCard.length > 12
    ) {
      this.setState({ errorIdentifyCard: "Độ dài số CMND không hợp lệ" });
    } else {
      this.setState({
        errorIdentifyCard: ""
      });
      await checkIdentifyCard(this.state.identifyCard).then(res => {
        if (res.Status === 200) {
          this.setState({
            isvalidIdentifyCard: true,
            isDisableIdentifyCardInput: true
          });
        } else if (res.Status === 403) {
          this.setState({
            isvalidIdentifyCard: false,
            errorIdentifyCard: res.Message
          });
        }
      });
    }
  }
  handelClickPrintBill(event) {
    event.preventDefault();
  }
  handelClickCancelAddCandidate(event) {
    event.preventDefault();
    this.setState({
      isDisableIdentifyCardInput: false,
      isvalidIdentifyCard: false,
      errorCandidateName: "",
      registrationId: ""
    });
  }
  async handelClickPrintBill(event) {
    event.preventDefault();
    if (this.state.candidateName === "") {
      this.setState({ errorCandidateName: "Vui lòng điền tên người đăng kí" });
    } else {
      this.setState({ errorCandidateName: "" });
      const account = JSON.parse(sessionStorage.getItem("user"));
      const { identifyCard, registrationPrice, candidateName } = this.state;
      await createRegistrationInterview(
        identifyCard,
        registrationPrice.Value,
        candidateName,
        account.ManagementUnitId,
        account.AccountId
      ).then(res => {
        if (res.Status === 201) {
          this.setState({ registrationId: res.Results.Id });
        } else if (res.Status === 409) {
          this.setState({
            errorCreateRegistrationInterview:
              "Ứng viên này đã tồn tại trong hệ thống"
          });
        }
      });
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Col sm={8} smOffset={2}>
          {this.state.registrationId === "" ? (
            <div>
             
              <div className="text-center checkIDBox">
              <h3 className="text-center text-info">XUẤT HÓA ĐƠN ĐĂNG KÍ</h3>
                <Form inline onSubmit={this.handleSubmitCheckIndentifyCard}>
                  <p className="text-warning">
                    Vui lòng nhập số chứng minh nhân dân sau đó nhấn xác nhận để
                    hệ thống kiểm tra
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
                      disabled={this.state.isDisableIdentifyCardInput}
                    />
                  </FormGroup>{" "}
                  <Button type="submit" bsStyle="success">
                    XÁC NHẬN
                  </Button>
                </Form>
              </div>{" "}
              {this.state.isvalidIdentifyCard ? (
                <Col sm={8} smOffset={2} className="exportBillBox">
                  <Panel>
                    <Panel.Body>
                      <form>
                        <FormGroup
                          controlId="formBasicText"
                          validationState={
                            this.state.errorCandidateName !== ""
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
                          <FormControl.Static>
                            <b>
                              <i>{this.state.registrationPrice.Value} VND </i>{" "}
                            </b>{" "}
                          </FormControl.Static>
                        </FormGroup>
                      </form>
                    </Panel.Body>

                    <Panel.Footer>
                      <Row>
                        <Col sm={6} xs={6}>
                          <Button
                            bsStyle="danger"
                            onClick={this.handelClickCancelAddCandidate}
                          >
                            HỦY
                          </Button>
                        </Col>
                        <Col sm={6} xs={6}>
                          <Button
                            block
                            bsStyle="primary"
                            onClick={this.handelClickPrintBill}
                          >
                            <Glyphicon glyph="plus" /> THÊM ỨNG VIÊN
                          </Button>
                        </Col>
                      </Row>
                    </Panel.Footer>
                  </Panel>
                </Col>
              ) : null}
            </div>
          ) : (
            <div>
              <div className="checkIDBox">
                <h4 className="text-center text-success">
                  Thêm ứng viên <b>{this.state.candidateName}</b> thành công với
                  mã hồ sơ là <b>{this.state.registrationId}</b>
                </h4>
                <ReactToPrint
                  trigger={() => (
                    <p className="text-center">
                      <Button bsStyle="primary">
                        <Glyphicon glyph="print" /> XUẤT HÓA ĐƠN
                      </Button>
                    </p>
                  )}
                  content={() => this.componentRef}
                />
                <div className="hidden">
                  <ExportBill
                    ref={el => (this.componentRef = el)}
                    dataToprint={this.state}
                  />
                </div>
              </div>
              <div className="checkIDBox text-center">
                <Button
                  bsStyle="danger"
                  onClick={this.handelClickCancelAddCandidate}
                >
                  <Glyphicon glyph="arrow-left" /> QUAY LẠI
                </Button>
              </div>
            </div>
          )}
        </Col>
      </div>
    );
  }
}

export default CashierExportBill;
