import React, { Component } from "react";
import {
  getRegistrationPriceByMananagementUnitId,
  checkIdentifyCard,
  createRegistrationInterview
} from "../api/cashierAPI";
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
  ButtonGroup,
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
      isDisableIdentifyCardInput: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitCheckIndentifyCard = this.handleSubmitCheckIndentifyCard.bind(
      this
    );
    this.handelClickPrintBill = this.handelClickPrintBill.bind(this);
    this.handleClickCancelPrintBill = this.handleClickCancelPrintBill.bind(
      this
    );
  }
  async componentDidMount() {
    await getRegistrationPriceByMananagementUnitId(1).then(res =>
      this.setState({ registrationPrice: res.Value })
    );
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
    } else if (this.state.identifyCard.length < 9) {
      this.setState({ errorIdentifyCard: "Độ dài số CMND không hợp lệ" });
    } else {
      this.setState({
        errorIdentifyCard: "",
        isDisableIdentifyCardInput: true
      });
      await checkIdentifyCard(this.state.identifyCard).then(res => {
        if (res.Status === 1) {
          this.setState({ isvalidIdentifyCard: true });
        } else if (res.Status === 3) {
          this.setState({
            isvalidIdentifyCard: false,
            errorIdentifyCard:
              "Thí sinh này đã đậu ở kì tuyển trước đó, và đã được phân đơn vị công tác"
          });
        } else if (res.Status === 2) {
          this.setState({
            isvalidIdentifyCard: false,
            errorIdentifyCard: `Thí sinh này đã đăng kí trước đó. Mã đăng kí là ${
              res.Message
            }`
          });
        }
      });
    }
  }
  handleClickCancelPrintBill(event) {
    event.preventDefault();
    this.setState({ isDisableIdentifyCardInput: false, isvalidIdentifyCard: false });
  }
  async handelClickPrintBill(event) {
    event.preventDefault();
    if (this.state.candidateName === "") {
      this.setState({ errorCandidateName: "Vui lòng điền tên người đăng kí" });
    } else {
      this.setState({ errorCandidateName: "" });
      const { identifyCard, registrationPrice, candidateName } = this.state;
      await createRegistrationInterview(
        identifyCard,
        registrationPrice,
        candidateName
      ).then(res => {
        if (res.status === 201) {
          this.setState({ registrationId: res.Results.Id });
        } else if (res.Status === 409) {
          this.setState({
            errorCreateRegistrationInterview: "Thí sinh này đã tồn tại trong hệ thống"
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
                  disabled={this.state.isDisableIdentifyCardInput}
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
                  <form>
                    <FormGroup
                      controlId="formBasicText"
                      validationState={
                        this.state.errorCandidateName !== "" ? "error" : null
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
                          <i>{this.state.registrationPrice} VND </i>{" "}
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
                        onClick={this.handleClickCancelPrintBill}
                      >
                        Hủy
                      </Button>
                    </Col>
                    <Col sm={6} xs={6}>
                      <Button
                        block
                        bsStyle="primary"
                        onClick={this.handelClickPrintBill}
                      >
                        <Glyphicon glyph="print" /> Xuất hóa đơn
                      </Button>
                    </Col>
                  </Row>
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
