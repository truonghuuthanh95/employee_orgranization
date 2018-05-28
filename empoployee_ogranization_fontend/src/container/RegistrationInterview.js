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
  Row,
  HelpBlock,
  Checkbox
} from "react-bootstrap";
import moment from "moment";
import {
  checkIsValidToUpdateRegistrationInterview,
  getDistrictByProvinceId,
  getProvinceByCountryId,
  getWardByDistrictId,
  getAllDegreeClassfication,
  getAllHightestEducation,
  getAllSubject,
  getAllTranningCaterory,
  getAllSpecializedTraining,
  getAllInfomaionTechnology,
  getAllGraduationClassfication,
  getAllForeignLanguageClassfication,
  getAllStatusWorkingInEducation,
  getSchoolDegree,
  updateRegistrationInterview
} from "../api/candidateAPI";
import ExportRegistrationInterview from '../component/ExportRegistrationInterview';
import ReactToPrint from "react-to-print";
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
      isValidIdentifyCard: false,
      identifyCard: "",
      registrationId: "",
      errorIdentifyCard: "",
      registrationInterview: {},
      houseHoldProvinceList: [],
      houseHoldDistrictList: [],
      houseHoldWardList: [],
      houseHold: {},
      currentLivingAddressDistrictList: [],
      currentLivingAddressWardList: [],
      currentLivingAddress: {},
      subjectList: [],
      tranningCatergoryList: [],
      highestEducationList: [],
      degreeeClassficationList: [],
      specialiedTrainningList: [],
      infomationTechnologyList: [],
      graduationClassficationList: [],
      foreignLanguageList: [],
      workingInEducationList: [],
      schoolDegreeList: [],
      errorCandidateName: undefined,
      errorCandidateFirstName: undefined,
      errorHouseNumberCurrentLiving: undefined,
      errorHouseNumberHousehold: undefined,
      errorEmail: undefined,
      errorPhoneNumber: undefined,
      errorUniversityName: undefined,
      errorNgghiepVuSuPham: undefined,
      errorAVG: undefined,
      errorIsAgree: undefined,
      errorCaptionProjectPoint: undefined,
      showFormInput: 1,
      isAgree: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeIdentifyCard = this.handleChangeIdentifyCard.bind(this);
    this.handleSubmitCheckIndentifyCard = this.handleSubmitCheckIndentifyCard.bind(
      this
    );
    this.handleInputChangeRegistrationInterview = this.handleInputChangeRegistrationInterview.bind(
      this
    );
    this.handleInputChangeCurrentLivingAddressRegistrationInterview = this.handleInputChangeCurrentLivingAddressRegistrationInterview.bind(
      this
    );
    this.handleInputChangeHouseHoldRegistrationInterview = this.handleInputChangeHouseHoldRegistrationInterview.bind(
      this
    );
    this.handleCheckPersonInformation = this.handleCheckPersonInformation.bind(
      this
    );
    this.handleCheckeducation = this.handleCheckeducation.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleAgree = this.handleAgree.bind(this);
    this.handleSubmitUpdateInfomationRegistrationInterview = this.handleSubmitUpdateInfomationRegistrationInterview.bind(
      this
    );
  }
  componentWillMount() {
    //init year of birth to select
    for (
      let index = moment().year() - 50;
      index < moment().year() + 1;
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
  handleInputChangeRegistrationInterview(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      ["registrationInterview"]: {
        ...this.state["registrationInterview"],
        [name]: value
      }
    });
  }
  async handleInputChangeCurrentLivingAddressRegistrationInterview(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "HouseNumber") {
      this.setState({
        currentLivingAddress: {
          ...this.state.currentLivingAddress,
          ["HouseNumber"]: value
        }
      });
    } else if (name === "DistrictID") {
      await getWardByDistrictId(value).then(res => {
        if (res.Status === 200) {
          this.setState({
            currentLivingAddressWardList: res.Results,
            currentLivingAddress: {
              ...this.state.currentLivingAddress,
              Ward: {
                ...this.state.currentLivingAddress.Ward,
                Id: res.Results[0].Id,
                DistrictID: value
              }
            }
          });
        }
      });
    } else {
      this.setState({
        currentLivingAddress: {
          ...this.state.currentLivingAddress,
          Ward: {
            ...this.state.currentLivingAddress.Ward,
            [name]: value
          }
        }
      });
    }
  }
  async handleInputChangeHouseHoldRegistrationInterview(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "HouseNumber") {
      this.setState({
        houseHold: {
          ...this.state.houseHold,
          ["HouseNumber"]: value
        }
      });
    } else if (name === "ProvinceId") {
      //sau khi user click chon thanh pho, he thong se load lai cac quan thuoc thanh pho do
      await getDistrictByProvinceId(value).then(async res => {
        //set lai tp da chon
        this.setState({
          houseHold: {
            ...this.state.houseHold,
            Ward: {
              ...this.state.houseHold.Ward,
              District: {
                ...this.state.houseHold.Ward.District,
                Province: {
                  ...this.state.houseHold.Ward.District.Province,
                  ["Id"]: value
                }
              }
            }
          }
        });
        if (res.Status === 200) {
          //sau khi load thanh cong, he thong se set lai quan/huyen da chon la quan/huyen [0] theo list tra ve
          this.setState({
            houseHoldDistrictList: res.Results,
            houseHold: {
              ...this.state.houseHold,
              Ward: {
                ...this.state.houseHold.Ward,
                DistrictID: res.Results[0].Id
              }
            }
          });
          //load cac phuong/xa theo defaual quan/huyen[0], sau do set lai ward la [0]
          await getWardByDistrictId(res.Results[0].Id).then(res => {
            if (res.Status === 200) {
              this.setState({
                houseHoldWardList: res.Results,
                houseHold: {
                  ...this.state.houseHold,
                  Ward: {
                    ...this.state.houseHold.Ward,
                    Id: res.Results[0].Id
                  }
                }
              });
            }
          });
        }
      });
    } else if (name === "DistrictID") {
      await getWardByDistrictId(value).then(res => {
        if (res.Status === 200) {
          this.setState({
            houseHoldWardList: res.Results,
            houseHold: {
              ...this.state.houseHold,
              Ward: {
                ...this.state.houseHold.Ward,
                Id: res.Results[0].Id,
                DistrictID: value
              }
            }
          });
        }
      });
    } else {
      this.setState({
        houseHold: {
          ...this.state.houseHold,
          Ward: {
            ...this.state.houseHold.Ward,
            [name]: value
          }
        }
      });
    }
  }
  async handleSubmitCheckIndentifyCard(event) {
    event.preventDefault();
    if (this.state.identifyCard === "") {
      this.setState({ errorIdentifyCard: "Vui lòng nhập mã hồ sơ và số CMND" });
    } else if (this.state.identifyCard.length < 9) {
      this.setState({ errorIdentifyCard: "Độ dài số CMND không hợp lệ" });
    } else {
      this.setState({ errorIdentifyCard: "" });
      await checkIsValidToUpdateRegistrationInterview(
        this.state.registrationId,
        this.state.identifyCard
      ).then(async res => {
        if (res.Status === 200) {
          this.setState({
            isValidIdentifyCard: true,
            registrationInterview: res.Results,
            currentLivingAddress: res.Results.CurrentLivingAddress,
            houseHold: res.Results.HouseHold,
            dayOfBirthSelected: moment(res.Results.DOB).date(),
            monthOfBirthSelected: moment(res.Results.DOB).month() + 1,
            yearOfBirthSelected: moment(res.Results.DOB).year()
          });
          //get province for select household with defaule 237 is Vietnamese
          await getProvinceByCountryId(237).then(res => {
            this.setState({ houseHoldProvinceList: res.Results });
          });
          //get district for select current living with default 70 is Hoc chi minh city
          await getDistrictByProvinceId(79).then(res => {
            this.setState({ currentLivingAddressDistrictList: res.Results });
          });
          //get ward to slelect current living ward
          await getWardByDistrictId(
            this.state.registrationInterview.CurrentLivingAddress.Ward
              .DistrictID
          ).then(res => {
            this.setState({ currentLivingAddressWardList: res.Results });
          });
          // get disttrict by province to select household district depend server response
          await getDistrictByProvinceId(
            this.state.registrationInterview.HouseHold.Ward.District.Province.Id
          ).then(res => this.setState({ houseHoldDistrictList: res.Results }));
          //get ward by district to select household ward depend on server response
          await getWardByDistrictId(
            this.state.registrationInterview.HouseHold.Ward.DistrictID
          ).then(res => this.setState({ houseHoldWardList: res.Results }));
          //get All subject to sleclect:
          await getAllSubject().then(res => {
            if (res.Status === 200) {
              this.setState({ subjectList: res.Results });
            }
          });
          await getAllDegreeClassfication().then(res => {
            if (res.Status === 200) {
              this.setState({ degreeeClassficationList: res.Results });
            }
          });
          await getAllHightestEducation().then(res => {
            if (res.Status === 200) {
              this.setState({ highestEducationList: res.Results });
            }
          });
          await getAllSpecializedTraining().then(res => {
            if (res.Status === 200) {
              this.setState({ specialiedTrainningList: res.Results });
            }
          });
          await getAllInfomaionTechnology().then(res => {
            if (res.Status === 200) {
              this.setState({ infomationTechnologyList: res.Results });
            }
          });
          await getAllTranningCaterory().then(res => {
            if (res.Status === 200) {
              this.setState({ tranningCatergoryList: res.Results });
            }
          });
          await getAllGraduationClassfication().then(res => {
            if (res.Status === 200) {
              this.setState({ graduationClassficationList: res.Results });
            }
          });
          await getAllForeignLanguageClassfication().then(res => {
            if (res.Status === 200) {
              this.setState({ foreignLanguageList: res.Results });
            }
          });
          await getAllStatusWorkingInEducation().then(res => {
            if (res.Status === 200) {
              this.setState({ workingInEducationList: res.Results });
            }
          });
          await getSchoolDegree().then(res => {
            if (res.Status === 200) {
              this.setState({ schoolDegreeList: res.Results });
            }
          });
        } else if (res.Status === 403) {
          this.setState({
            isValidIdentifyCard: false,
            errorIdentifyCard: res.Message
          });
        }
      });
    }
  }
  handleChangeIdentifyCard() {
    this.setState({ isValidIdentifyCard: false });
  }
  handleSubmitRegistrationInterview(event) {
    event.preventDefault();
  }
  async _validatePersonalInformation() {
    const {
      Email,
      PhoneNumber
    } = this.state.registrationInterview;
    const { currentLivingAddress, houseHold } = this.state;

    if (
      currentLivingAddress.HouseNumber === null ||
      houseHold.HouseNumber === null ||
      Email === null ||
      PhoneNumber === null ||
      currentLivingAddress.HouseNumber === "" ||
      houseHold.HouseNumber === "" ||
      Email === "" ||
      PhoneNumber === ""
    ) {
      // if (CandidateFirstName === null || CandidateFirstName === "") {
      //   this.setState({ errorCandidateFirstName: "Vui lòng điền tên" });
      // } else {
      //   this.setState({ errorCandidateFirstName: undefined });
      // }
      // if (CandidateLastName === null || CandidateLastName === "") {
      //   this.setState({
      //     errorCandidateName: "Vui lòng điền đầy đủ họ và tên lót"
      //   });
      // } else {
      //   this.setState({
      //     errorCandidateName: undefined
      //   });
      // }
      if (
        currentLivingAddress.HouseNumber === null ||
        currentLivingAddress.HouseNumber === ""
      ) {
        this.setState({
          errorHouseNumberCurrentLiving: "Vui lòng điền số nhà"
        });
      } else {
        this.setState({
          errorHouseNumberCurrentLiving: undefined
        });
      }
      if (houseHold.HouseNumber === null || houseHold.HouseNumber === "") {
        this.setState({
          errorHouseNumberHousehold: "Vui lòng điền số nhà"
        });
      } else {
        this.setState({
          errorHouseNumberHousehold: undefined
        });
      }
      if (Email === null || Email === "") {
        this.setState({ errorEmail: "Vui lòng điền địa chỉ email" });
      } else {
        this.setState({ errorEmail: undefined });
      }
      if (PhoneNumber === null || PhoneNumber === "") {
        this.setState({ errorPhoneNumber: "Vui lòng nhập số điện thoại" });
      } else {
        this.setState({ errorPhoneNumber: undefined });
      }
      return false;
    }

    this.setState({
      errorEmail: undefined,
      errorHouseNumberCurrentLiving: undefined,
      errorHouseNumberHousehold: undefined,
      errorPhoneNumber: undefined,
      errorCandidateFirstName: undefined
    });
    return true;
  }
  //check valid person infomation
  async handleCheckPersonInformation(event) {
    event.preventDefault();
    await this._validatePersonalInformation().then(result => {
      if (result === true) {
        this.setState({ showFormInput: 2 });
      }
    });
  }
  async _validateEducation() {
    const {
      UniversityName,
      GraduationClassficationId,
      GPA,
      CaptionProjectPoint,
      IsNienChe
    } = this.state.registrationInterview;
    if (
      UniversityName === null ||
      UniversityName === "" ||
      GPA === null ||
      GPA === "" ||
      (CaptionProjectPoint === null && IsNienChe === "true") ||
      (CaptionProjectPoint === "" && IsNienChe === "true")
    ) {
      if (UniversityName === null || UniversityName === "") {
        this.setState({
          errorUniversityName: "Vui lòng điền tên trường đào tạo"
        });
      } else {
        this.setState({ errorUniversityName: undefined });
      }

      if (
        (CaptionProjectPoint === null && IsNienChe === "true") ||
        (CaptionProjectPoint === "" && IsNienChe === "true")
      ) {
        this.setState({
          errorCaptionProjectPoint: "Vui lòng nhập điểm luận văn"
        });
      } else {
        this.setState({ errorCaptionProjectPoint: undefined });
      }
      if (GPA === null || GPA === "") {
        this.setState({ errorAVG: "Vui lòng nhập điểm trung bình" });
      } else {
        this.setState({ errorAVG: undefined });
      }
      return false;
    }
    this.setState({
      errorNgghiepVuSuPham: undefined,
      errorUniversityName: undefined,
      errorAVG: undefined,
      errorCaptionProjectPoint: undefined
    });
    return true;
  }
  async handleCheckeducation(event) {
    event.preventDefault();
    await this._validateEducation().then(result => {
      if (result === true) {
        this.setState({ showFormInput: 3 });
      }
    });
  }
  async _validateCheckExpectation() {
    const { isAgree, subjectList } = this.state;
    const {
      IsHadNghiepVuSupham,
      GraduationClassficationId,
      SubjectToInterviewId
    } = this.state.registrationInterview;
    const positionInterview = subjectList.find(
      subject => subject.Id == SubjectToInterviewId
    );

    if (
      isAgree !== true ||
      (IsHadNghiepVuSupham === "false" &&
        GraduationClassficationId == "2" &&
        positionInterview.PositionInterview.Id == "2") ||
      (IsHadNghiepVuSupham === "false" &&
        GraduationClassficationId == "4" &&
        positionInterview.PositionInterview.Id == "2") ||
      (IsHadNghiepVuSupham === "false" &&
        GraduationClassficationId == "6" &&
        positionInterview.PositionInterview.Id == "2")
    ) {
      if (
        (IsHadNghiepVuSupham === "false" &&
          GraduationClassficationId == "2" &&
          positionInterview.PositionInterview.Id == "2") ||
        (IsHadNghiepVuSupham === "false" &&
          GraduationClassficationId == "4" &&
          positionInterview.PositionInterview.Id == "2") ||
        (IsHadNghiepVuSupham === "false" &&
          GraduationClassficationId == "6" &&
          positionInterview.PositionInterview.Id == "2")
      ) {
        this.setState({
          errorNgghiepVuSuPham:
            "Hiện tại bằng tốt nghiệp của bạn không phải tốt nghiệp ngành sư phạm. Vì vậy yêu cầu cần phải có chứng chỉ bồi dưỡng sư phạm"
        });
      } else {
        this.setState({ errorNgghiepVuSuPham: undefined });
      }
      if (isAgree !== true) {
        this.setState({
          errorIsAgree:
            "Vui lòng tích vào nếu như thông tin bạn khai là đúng sự thật"
        });
      } else {
        this.setState({ errorIsAgree: undefined });
      }
      return false;
    } else {
      this.setState({
        errorIsAgree: undefined,
        errorNgghiepVuSuPham: undefined
      });
      return true;
    }
  }
  async handleSubmitUpdateInfomationRegistrationInterview(event) {
    const {
      isAgree,
      registrationInterview,
      yearOfBirthSelected,
      monthOfBirthSelected,
      dayOfBirthSelected,
      currentLivingAddress,
      houseHold,
      subjectList
    } = this.state;
    event.preventDefault();
    await this._validateCheckExpectation().then(async result => {
      if (result === true) {
        await updateRegistrationInterview(
          registrationInterview,
          `${yearOfBirthSelected}/${monthOfBirthSelected}/${dayOfBirthSelected}`,
          currentLivingAddress,
          houseHold
        ).then(res => {
          if (res.Status === 200) {
            this.setState({ showFormInput: 4, registrationInterview: res.Results });
          }
        });
      }
    });
  }
  handleAgree(event) {
    event.preventDefault();
    this.setState(prevous => ({ isAgree: !prevous.isAgree }));
  }
  handleBack(event) {
    event.preventDefault();
    this.setState(prevous => ({ showFormInput: prevous.showFormInput - 1 }));
  }
  render() {
    const { subjectList } = this.state;
    const { SubjectToInterviewId } = this.state.registrationInterview;
    const positionInterview = subjectList.find(
      subject => subject.Id == SubjectToInterviewId
    );
    console.log(moment().date());
    return (
      <div>
        <Header />
        <Col sm={8} smOffset={2}>
          {/* after valid identify card, system will change to input infomation to registration interview component */}
          {!this.state.isValidIdentifyCard ? (
            <div className="text-center checkIDBox">
              <Form inline onSubmit={this.handleSubmitCheckIndentifyCard}>
                <h3 className="text-center text-info">
                  CẬP NHẬT HỒ SƠ ỨNG TUYỂN
                </h3>
                <p className="text-warning">
                  Vui lòng nhập mã hồ sơ đăng kí trong biên lai và nhập số chứng
                  minh nhân dân sau đó nhấn xác nhận để hệ thống kiểm tra
                </p>
                <p className="text-danger">{this.state.errorIdentifyCard}</p>
                <FormGroup controlId="formInlineName">
                  <ControlLabel>Mã</ControlLabel>{" "}
                  <FormControl
                    type="number"
                    placeholder="Mã đăng kí"
                    name="registrationId"
                    onChange={this.handleInputChange}
                    value={this.state.registrationId}
                  />
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
                  XÁC NHẬN
                </Button>
              </Form>
            </div>
          ) : this.state.showFormInput !== 4 ? (
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">
                  Cập nhật hồ sơ ứng tuyển
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <p className="text-center text-warning">
                  Vui lòng điền thông tin theo thứ tự. Mọi thắc mắc vui lòng
                  liên hệ (Chọn trên thanh công cụ)
                </p>
                {this.state.showFormInput === 1 ? (
                  <form>
                    <Row>
                      <Col sm={4}>
                        <FormGroup>
                          <ControlLabel>1.Họ và tên</ControlLabel>
                          <FormControl.Static>
                            {this.state.registrationInterview
                              .CandidateLastName +
                              " " +
                              this.state.registrationInterview
                                .CandidateFirstName}
                          </FormControl.Static>
                        </FormGroup>
                      </Col>
                      <Col sm={4}>
                        <FormGroup>
                          <ControlLabel>2.Số CMND</ControlLabel>
                          <FormControl.Static>
                            {this.state.registrationInterview.IdentifyCard}
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
                            value={this.state.registrationInterview.IsMale}
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="IsMale"
                          >
                            <option value="true">Nam</option>
                            <option value="false">Nữ</option>
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <ControlLabel>5.Nơi ở hiện tại</ControlLabel>
                      {/* <FormControl.Static>email@example.com</FormControl.Static> */}
                    </FormGroup>
                    <Col sm={11} smOffset={1} xs={11} xsOffset={1}>
                      <Row>
                        <Col sm={3}>
                          <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Quận/Huyện</ControlLabel>
                            <FormControl
                              componentClass="select"
                              value={
                                this.state.currentLivingAddress.Ward.DistrictID
                              }
                              onChange={
                                this
                                  .handleInputChangeCurrentLivingAddressRegistrationInterview
                              }
                              name="DistrictID"
                            >
                              {this.state.currentLivingAddressDistrictList
                                .length > 0
                                ? this.state.currentLivingAddressDistrictList.map(
                                    districts => (
                                      <option
                                        value={districts.Id}
                                        key={districts.Id}
                                      >
                                        {districts.Type + " " + districts.Name}
                                      </option>
                                    )
                                  )
                                : null}
                            </FormControl>
                          </FormGroup>
                        </Col>
                        <Col sm={4}>
                          <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Phường</ControlLabel>
                            <FormControl
                              componentClass="select"
                              value={this.state.currentLivingAddress.Ward.Id}
                              onChange={
                                this
                                  .handleInputChangeCurrentLivingAddressRegistrationInterview
                              }
                              name="Id"
                            >
                              {this.state.currentLivingAddressWardList.length >
                              0
                                ? this.state.currentLivingAddressWardList.map(
                                    wards => (
                                      <option value={wards.Id} key={wards.Id}>
                                        {wards.Type + " " + wards.Name}
                                      </option>
                                    )
                                  )
                                : null}
                            </FormControl>
                          </FormGroup>
                        </Col>
                        <Col sm={5}>
                          <FormGroup
                            controlId="formControlsSelect"
                            validationState={
                              this.state.errorHouseNumberCurrentLiving !==
                              undefined
                                ? "error"
                                : null
                            }
                          >
                            <ControlLabel>
                              Số nhà{" "}
                              <Label bsClass="text-danger">
                                <Glyphicon glyph="star" />
                              </Label>
                            </ControlLabel>
                            <FormControl
                              type="text"
                              placeholder="Số nhà"
                              name="HouseNumber"
                              value={
                                this.state.currentLivingAddress.HouseNumber
                              }
                              onChange={
                                this
                                  .handleInputChangeCurrentLivingAddressRegistrationInterview
                              }
                            />
                            <FormControl.Feedback />
                            <HelpBlock>
                              {this.state.errorHouseNumberCurrentLiving}
                            </HelpBlock>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <FormGroup>
                      <ControlLabel>6.Hộ khẩu thường trú</ControlLabel>
                      {/* <FormControl.Static>email@example.com</FormControl.Static> */}
                    </FormGroup>
                    <Col sm={11} smOffset={1} xs={11} xsOffset={1}>
                      <Row>
                        <Col sm={4}>
                          <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Tỉnh/Thành phố</ControlLabel>
                            <FormControl
                              componentClass="select"
                              value={
                                this.state.houseHold.Ward.District.Province.Id
                              }
                              onChange={
                                this
                                  .handleInputChangeHouseHoldRegistrationInterview
                              }
                              name="ProvinceId"
                            >
                              {this.state.houseHoldProvinceList.length > 0
                                ? this.state.houseHoldProvinceList.map(
                                    provinces => (
                                      <option
                                        value={provinces.Id}
                                        key={provinces.Id}
                                      >
                                        {provinces.Type + " " + provinces.Name}
                                      </option>
                                    )
                                  )
                                : null}
                            </FormControl>
                          </FormGroup>
                        </Col>
                        <Col sm={3}>
                          <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Quận/Huyện</ControlLabel>
                            <FormControl
                              componentClass="select"
                              value={this.state.houseHold.Ward.DistrictID}
                              onChange={
                                this
                                  .handleInputChangeHouseHoldRegistrationInterview
                              }
                              name="DistrictID"
                            >
                              {this.state.houseHoldDistrictList.length > 0
                                ? this.state.houseHoldDistrictList.map(
                                    districts => (
                                      <option
                                        value={districts.Id}
                                        key={districts.Id}
                                      >
                                        {districts.Type + " " + districts.Name}
                                      </option>
                                    )
                                  )
                                : null}
                            </FormControl>
                          </FormGroup>
                        </Col>
                        <Col sm={4}>
                          <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Phường/Xã</ControlLabel>
                            <FormControl
                              componentClass="select"
                              value={this.state.houseHold.Ward.Id}
                              onChange={
                                this
                                  .handleInputChangeHouseHoldRegistrationInterview
                              }
                              name="Id"
                            >
                              {this.state.houseHoldWardList.length > 0
                                ? this.state.houseHoldWardList.map(wards => (
                                    <option value={wards.Id} key={wards.Id}>
                                      {wards.Type + " " + wards.Name}
                                    </option>
                                  ))
                                : null}
                            </FormControl>
                          </FormGroup>
                        </Col>
                        <Col sm={5}>
                          <FormGroup
                            controlId="formControlsSelect"
                            validationState={
                              this.state.errorHouseNumberHousehold !== undefined
                                ? "error"
                                : null
                            }
                          >
                            <ControlLabel>
                              Số nhà/Thôn{" "}
                              <Label bsClass="text-danger">
                                <Glyphicon glyph="star" />
                              </Label>
                            </ControlLabel>
                            <FormControl
                              type="text"
                              placeholder="Số nhà/Thôn"
                              name="HouseNumber"
                              value={this.state.houseHold.HouseNumber}
                              onChange={
                                this
                                  .handleInputChangeHouseHoldRegistrationInterview
                              }
                            />
                            <FormControl.Feedback />
                            <HelpBlock>
                              {this.state.errorHouseNumberHousehold}
                            </HelpBlock>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Row>
                      <Col sm={8}>
                        <FormGroup
                          controlId="formControlsSelect"
                          validationState={
                            this.state.errorEmail !== undefined ? "error" : null
                          }
                        >
                          <ControlLabel>7.Địa chỉ email </ControlLabel>
                          <FormControl
                            type="text"
                            placeholder="Email"
                            name="Email"
                            value={this.state.registrationInterview.Email}
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                          />
                          <FormControl.Feedback />
                          <HelpBlock>{this.state.errorEmail}</HelpBlock>
                        </FormGroup>
                      </Col>
                      <Col sm={4}>
                        <FormGroup
                          controlId="formControlsSelect"
                          validationState={
                            this.state.errorPhoneNumber !== undefined
                              ? "error"
                              : null
                          }
                        >
                          <ControlLabel>8.Số điện thoại </ControlLabel>
                          <FormControl
                            type="text"
                            placeholder="Số điện thoại"
                            name="PhoneNumber"
                            value={this.state.registrationInterview.PhoneNumber}
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                          />
                          <FormControl.Feedback />
                          <HelpBlock>{this.state.errorPhoneNumber}</HelpBlock>
                        </FormGroup>
                      </Col>
                    </Row>
                  </form>
                ) : this.state.showFormInput === 2 ? (
                  <form>
                    <Row>
                      <Col sm={8}>
                        <FormGroup
                          controlId="formControlsSelect"
                          validationState={
                            this.state.errorUniversityName !== undefined
                              ? "error"
                              : null
                          }
                        >
                          <ControlLabel>9.Tên trường đào tạo </ControlLabel>
                          <FormControl
                            type="text"
                            placeholder="Tên trường đào tạo"
                            name="UniversityName"
                            value={
                              this.state.registrationInterview.UniversityName
                            }
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                          />
                          <FormControl.Feedback />
                          <HelpBlock bsClass="text-warning">
                            Ghi đầy đủ tên trường (ví dụ: Trường đại học Bách
                            Khoa Tp.HCM)
                          </HelpBlock>
                          <HelpBlock>
                            {this.state.errorUniversityName}
                          </HelpBlock>
                        </FormGroup>
                      </Col>
                      <Col sm={4}>
                        <FormGroup>
                          <ControlLabel>10.Trường này ở</ControlLabel>
                          <FormControl
                            componentClass="select"
                            value={
                              this.state.registrationInterview
                                .UniversityLocation
                            }
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="UniversityLocation"
                          >
                            {this.state.houseHoldProvinceList.length > 0
                              ? this.state.houseHoldProvinceList.map(
                                  provinces => (
                                    <option
                                      value={provinces.Id}
                                      key={provinces.Id}
                                    >
                                      {provinces.Type + " " + provinces.Name}
                                    </option>
                                  )
                                )
                              : null}
                          </FormControl>
                          <FormControl.Feedback />
                          <HelpBlock bsClass="text-warning">
                            Vị trí trường đại học
                          </HelpBlock>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={5}>
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>11.Bằng tốt nghiệp</ControlLabel>
                          <FormControl
                            componentClass="select"
                            value={
                              this.state.registrationInterview
                                .GraduationClassficationId
                            }
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="GraduationClassficationId"
                          >
                            {this.state.graduationClassficationList.length > 0
                              ? this.state.graduationClassficationList.map(
                                  graduation => (
                                    <option
                                      value={graduation.Id}
                                      key={graduation.Id}
                                    >
                                      {graduation.Name}
                                    </option>
                                  )
                                )
                              : null}
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col sm={3}>
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>12.Hệ</ControlLabel>
                          <FormControl
                            componentClass="select"
                            value={
                              this.state.registrationInterview
                                .TrainningCatergoryId
                            }
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="TrainningCatergoryId"
                          >
                            {this.state.tranningCatergoryList.length > 0
                              ? this.state.tranningCatergoryList.map(
                                  tranning => (
                                    <option
                                      value={tranning.Id}
                                      key={tranning.Id}
                                    >
                                      {tranning.Name}
                                    </option>
                                  )
                                )
                              : null}
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col sm={4}>
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>13.Chuyên ngành đào tạo</ControlLabel>
                          <FormControl
                            componentClass="select"
                            value={
                              this.state.registrationInterview
                                .SpecializedTranningId
                            }
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="SpecializedTranningId"
                          >
                            {this.state.specialiedTrainningList.length > 0
                              ? this.state.specialiedTrainningList.map(
                                  tranning => (
                                    <option
                                      value={tranning.Id}
                                      key={tranning.Id}
                                    >
                                      {tranning.Name}
                                    </option>
                                  )
                                )
                              : null}
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup />
                    <Row>
                      <Col sm={4}>
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>14.Kiểu đào tạo</ControlLabel>
                          <FormControl
                            componentClass="select"
                            value={this.state.registrationInterview.IsNienChe}
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="IsNienChe"
                          >
                            <option value='true'>Qui chế niên chế</option>
                            <option value='false'>Qui chế tín chỉ</option>
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col sm={4}>
                        <FormGroup
                          controlId="formControlsSelect"
                          validationState={
                            this.state.errorAVG !== undefined ? "error" : null
                          }
                        >
                          <ControlLabel>15.Điểm tốt nghiệp </ControlLabel>
                          <Col>
                            <FormControl
                              type="number"
                              name="GPA"
                              value={this.state.registrationInterview.GPA}
                              onChange={
                                this.handleInputChangeRegistrationInterview
                              }
                            />
                          </Col>
                          <FormControl.Feedback />
                          <HelpBlock bsClass="text-warning">
                            Lưu ý ghi điểm đại học
                          </HelpBlock>
                          <HelpBlock>{this.state.errorAVG}</HelpBlock>
                        </FormGroup>
                      </Col>
                      {this.state.registrationInterview.IsNienChe == 'true' ||  this.state.registrationInterview.IsNienChe == true? (
                        <Col sm={4}>
                          <FormGroup
                            controlId="formControlsSelect"
                            validationState={
                              this.state.errorCaptionProjectPoint !== undefined
                                ? "error"
                                : null
                            }
                          >
                            <ControlLabel>15.1.Điểm luận văn TN</ControlLabel>
                            <Col>
                              <FormControl
                                type="number"
                                name="CaptionProjectPoint"
                                value={
                                  this.state.registrationInterview
                                    .CaptionProjectPoint
                                }
                                onChange={
                                  this.handleInputChangeRegistrationInterview
                                }
                              />
                            </Col>
                            <FormControl.Feedback />
                            <HelpBlock bsClass="text-warning">
                              Lưu ý ghi điểm đại học
                            </HelpBlock>
                            <HelpBlock>
                              {this.state.errorCaptionProjectPoint}
                            </HelpBlock>
                          </FormGroup>
                        </Col>
                      ) : null}
                    </Row>

                    <Row>
                      <Col sm={3}>
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>16.Năm tốt nghiệp</ControlLabel>
                          <FormControl
                            componentClass="select"
                            value={
                              this.state.registrationInterview.GraduatedAtYear
                            }
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="GraduatedAtYear"
                          >
                            {this.state.year.length > 0
                              ? this.state.year.map(year => (
                                  <option value={year.id} key={year.id}>
                                    {year.id}
                                  </option>
                                ))
                              : null}
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col sm={3}>
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>17.Xếp loại</ControlLabel>
                          <FormControl
                            componentClass="select"
                            value={
                              this.state.registrationInterview
                                .DegreeClassificationId
                            }
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="DegreeClassificationId"
                          >
                            {this.state.degreeeClassficationList.length > 0
                              ? this.state.degreeeClassficationList.map(
                                  degrees => (
                                    <option value={degrees.Id} key={degrees.Id}>
                                      {degrees.Name}
                                    </option>
                                  )
                                )
                              : null}
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col sm={5}>
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>
                            18.Trình độ cao nhất hiện nay
                          </ControlLabel>
                          <FormControl
                            componentClass="select"
                            value={
                              this.state.registrationInterview
                                .HighestLevelEducationId
                            }
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="HighestLevelEducationId"
                          >
                            {this.state.highestEducationList.length > 0
                              ? this.state.highestEducationList.map(
                                  hightest => (
                                    <option
                                      value={hightest.Id}
                                      key={hightest.Id}
                                    >
                                      {hightest.Name}
                                    </option>
                                  )
                                )
                              : null}
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <FormGroup>
                          <ControlLabel>
                           19.Công tác trong ngành giáo dục
                          </ControlLabel>

                          <FormControl
                            componentClass="select"
                            value={
                              this.state.registrationInterview
                                .StatusWorkingInEducationId
                            }
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="StatusWorkingInEducationId"
                          >
                            {this.state.workingInEducationList.length > 0
                              ? this.state.workingInEducationList.map(
                                  status => (
                                    <option value={status.Id} key={status.Id}>
                                      {status.Name}
                                    </option>
                                  )
                                )
                              : null}
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={5}>
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>20.Chứng chỉ tin hoc</ControlLabel>
                          <FormControl
                            componentClass="select"
                            value={
                              this.state.registrationInterview
                                .InfomationTechnologyDegreeId
                            }
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="InfomationTechnologyDegreeId"
                          >
                            {this.state.infomationTechnologyList.length > 0
                              ? this.state.infomationTechnologyList.map(
                                  info => (
                                    <option value={info.Id} key={info.Id}>
                                      {info.Name}
                                    </option>
                                  )
                                )
                              : null}
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col sm={5}>
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>21.Chứng chỉ ngoại ngữ</ControlLabel>
                          <FormControl
                            componentClass="select"
                            value={
                              this.state.registrationInterview
                                .ForeignLanguageDegreeId
                            }
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="ForeignLanguageDegreeId"
                          >
                            {this.state.foreignLanguageList.length > 0
                              ? this.state.foreignLanguageList.map(foreign => (
                                  <option value={foreign.Id} key={foreign.Id}>
                                    {foreign.Name}
                                  </option>
                                ))
                              : null}
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>
                  </form>
                ) : this.state.showFormInput === 3 ? (
                  <form>
                     <FormGroup>
                        <ControlLabel>
                          22.Thông tin lương (dành cho ứng viên có công tác và tham
                          gia Bảo hiểm XH)
                        </ControlLabel>
                      </FormGroup>
                    <Row>
                     
                      <Col sm={3}>
                        <FormGroup
                          controlId="formControlsSelect"
                          validationState={
                            this.state.errorAVG !== undefined ? "error" : null
                          }
                        >
                          <ControlLabel>Năm vào ngành </ControlLabel>
                          <Col>
                            <FormControl
                              type="number"
                              name="NamVaoNghanh"
                              value={this.state.registrationInterview.NamVaoNghanh}
                              onChange={
                                this.handleInputChangeRegistrationInterview
                              }
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col sm={3}>
                        <FormGroup
                          controlId="formControlsSelect"
                          validationState={
                            this.state.errorAVG !== undefined ? "error" : null
                          }
                        >
                          <ControlLabel>Mã ngạch </ControlLabel>
                          <Col>
                            <FormControl
                              type="text"
                              name="MaNgach"
                              value={this.state.registrationInterview.MaNgach}
                              onChange={
                                this.handleInputChangeRegistrationInterview
                              }
                            />
                          </Col>
                          <FormControl.Feedback />
                        </FormGroup>
                      </Col>
                      <Col sm={3}>
                        <FormGroup
                          controlId="formControlsSelect"
                          validationState={
                            this.state.errorAVG !== undefined ? "error" : null
                          }
                        >
                          <ControlLabel>Hệ số lương </ControlLabel>
                          <Col>
                            <FormControl
                              type="text"
                              name="HeSoLuong"
                              value={this.state.registrationInterview.HeSoLuong}
                              onChange={
                                this.handleInputChangeRegistrationInterview
                              }
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col sm={3}>
                        <FormGroup
                          controlId="formControlsSelect"
                          validationState={
                            this.state.errorAVG !== undefined ? "error" : null
                          }
                        >
                          <ControlLabel>Mốc nâng lương lần sau </ControlLabel>
                          <Col>
                            <FormControl
                              type="number"
                              name="MocNangLuongLansau"
                              value={
                                this.state.registrationInterview
                                  .MocNangLuongLansau
                              }
                              onChange={
                                this.handleInputChangeRegistrationInterview
                              }
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={5}>
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>Môn dự tuyển</ControlLabel>
                          <FormControl
                            componentClass="select"
                            value={
                              this.state.registrationInterview
                                .SubjectToInterviewId
                            }
                            onChange={
                              this.handleInputChangeRegistrationInterview
                            }
                            name="SubjectToInterviewId"
                          >
                            {this.state.subjectList.length > 0
                              ? this.state.subjectList.map(foreign => (
                                  <option value={foreign.Id} key={foreign.Id}>
                                    {foreign.PositionInterview.Name +
                                      " " +
                                      foreign.Name}
                                  </option>
                                ))
                              : null}
                          </FormControl>
                        </FormGroup>
                      </Col>
                      {(this.state.registrationInterview
                        .GraduationClassficationId == "2" &&
                        positionInterview.PositionInterview.Id == "2") ||
                      (this.state.registrationInterview
                        .GraduationClassficationId == "4" &&
                        positionInterview.PositionInterview.Id == "2") ||
                      (this.state.registrationInterview
                        .GraduationClassficationId == "6" &&
                        positionInterview.PositionInterview.Id == "2") ? (
                        <Col sm={6}>
                          <FormGroup
                            validationState={
                              this.state.errorNgghiepVuSuPham !== undefined
                                ? "error"
                                : null
                            }
                          >
                            <ControlLabel>
                              Đã có chứng chỉ bồi dưỡng nghiệp vụ sư phạm
                            </ControlLabel>
                            <FormControl
                              componentClass="select"
                              value={
                                this.state.registrationInterview
                                  .IsHadNghiepVuSupham
                              }
                              onChange={
                                this.handleInputChangeRegistrationInterview
                              }
                              name="IsHadNghiepVuSupham"
                            >
                              <option value="true">Đã có</option>
                              <option value="false">Chưa có</option>
                            </FormControl>
                            <FormControl.Feedback />
                            <HelpBlock>
                              {this.state.errorNgghiepVuSuPham}
                            </HelpBlock>
                          </FormGroup>
                        </Col>
                      ) : null}
                    </Row>

                    {this.state.registrationInterview
                      .CreatedAtManagementUnitId == "26" ? (
                      <Row>
                        <p className="text-center">
                          Chỉ dành cho ứng viên đăng ký dạy Trung học phổ thông
                          hoặc TT giáo dục thường xuyên trực thuộc
                        </p>
                        <Col sm={4}>
                          <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Nguyện vọng 1</ControlLabel>
                            <FormControl
                              componentClass="select"
                              value={
                                this.state.registrationInterview
                                  .Aspirations01DistrictId
                              }
                              onChange={
                                this.handleInputChangeRegistrationInterview
                              }
                              name="Aspirations01DistrictId"
                            >
                              {this.state.currentLivingAddressDistrictList
                                .length > 0
                                ? this.state.currentLivingAddressDistrictList.map(
                                    foreign => (
                                      <option
                                        value={foreign.Id}
                                        key={foreign.Id}
                                      >
                                        {foreign.Type + " " + foreign.Name}
                                      </option>
                                    )
                                  )
                                : null}
                            </FormControl>
                          </FormGroup>
                        </Col>
                        <Col sm={4}>
                          <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Nguyện vọng 2</ControlLabel>
                            <FormControl
                              componentClass="select"
                              value={
                                this.state.registrationInterview
                                  .Aspirations02DistrictId
                              }
                              onChange={
                                this.handleInputChangeRegistrationInterview
                              }
                              name="Aspirations02DistrictId"
                            >
                              {this.state.currentLivingAddressDistrictList
                                .length > 0
                                ? this.state.currentLivingAddressDistrictList.map(
                                    foreign => (
                                      <option
                                        value={foreign.Id}
                                        key={foreign.Id}
                                      >
                                        {foreign.Type + " " + foreign.Name}
                                      </option>
                                    )
                                  )
                                : null}
                            </FormControl>
                          </FormGroup>
                        </Col>
                        <Col sm={4}>
                          <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Nguyện vọng 3</ControlLabel>
                            <FormControl
                              componentClass="select"
                              value={
                                this.state.registrationInterview
                                  .Aspirations03DistrictId
                              }
                              onChange={
                                this.handleInputChangeRegistrationInterview
                              }
                              name="Aspirations03DistrictId"
                            >
                              {this.state.currentLivingAddressDistrictList
                                .length > 0
                                ? this.state.currentLivingAddressDistrictList.map(
                                    foreign => (
                                      <option
                                        value={foreign.Id}
                                        key={foreign.Id}
                                      >
                                        {foreign.Type + " " + foreign.Name}
                                      </option>
                                    )
                                  )
                                : null}
                            </FormControl>
                          </FormGroup>
                        </Col>
                      </Row>
                    ) : (
                      <Row>
                        <Col sm={5}>
                          <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Cấp dự tuyển</ControlLabel>
                            <FormControl
                              componentClass="select"
                              value={
                                this.state.registrationInterview
                                  .SchoolDegreeIdExpectedTeach
                              }
                              onChange={
                                this.handleInputChangeRegistrationInterview
                              }
                              name="SchoolDegreeIdExpectedTeach"
                            >
                              {this.state.schoolDegreeList.length > 0
                                ? this.state.schoolDegreeList.map(foreign => (
                                    <option value={foreign.Id} key={foreign.Id}>
                                      {foreign.Name}
                                    </option>
                                  ))
                                : null}
                            </FormControl>
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                    <Checkbox
                      checked={this.state.isAgree}
                      onChange={this.handleInputChange}
                      name="isAgree"
                      readOnly
                      validationState={
                        this.state.errorIsAgree !== undefined ? "error" : null
                      }
                    >
                      Tôi cam đoan những thông tin trên hoàn toàn đúng sự thật
                      và chịu trách nhiệm về những thông tin đã đăng kí
                      <FormControl.Feedback />
                      <HelpBlock>{this.state.errorIsAgree}</HelpBlock>
                    </Checkbox>
                  </form>
                ) : null}
              </Panel.Body>
              <Panel.Footer>
                {this.state.showFormInput === 1 ? (
                  <Button
                    block
                    bsStyle="success"
                    onClick={this.handleCheckPersonInformation}
                  >
                    TIẾP TỤC
                  </Button>
                ) : this.state.showFormInput === 2 ? (
                  <Row>
                    <Col sm={4} xs={6}>
                      <Button block bsStyle="danger" onClick={this.handleBack}>
                        <Glyphicon glyph="arrow-left" /> QUAY LẠI
                      </Button>
                    </Col>
                    <Col sm={8} xs={6}>
                      <Button
                        block
                        bsStyle="success"
                        onClick={this.handleCheckeducation}
                      >
                        TIẾP TỤC
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col sm={4} xs={6}>
                      <Button block bsStyle="danger" onClick={this.handleBack}>
                        <Glyphicon glyph="arrow-left" /> QUAY LẠI
                      </Button>
                    </Col>
                    <Col sm={8} xs={6}>
                      <Button
                        block
                        bsStyle="success"
                        onClick={
                          this.handleSubmitUpdateInfomationRegistrationInterview
                        }
                      >
                        HOÀN TẤT
                      </Button>
                    </Col>
                  </Row>
                )}
              </Panel.Footer>
            </Panel>
          ) : (
            <div className="checkIDBox text-center">
              <h3 className="text-success">CẬP NHẬT HỒ SƠ THÀNH CÔNG</h3>
              <ReactToPrint
                  trigger={() => (
                    <p className="text-center">
                      <Button bsStyle="primary">
                        <Glyphicon glyph="print" /> IN HỒ SƠ
                      </Button>
                    </p>
                  )}
                  content={() => this.componentRef}
                />
                <div className="hidden">
                  <ExportRegistrationInterview
                    ref={el => (this.componentRef = el)}
                    dataToprint={this.state}
                  />
                </div>
              
            </div>
          )}
        </Col>
      </div>
    );
  }
}

export default RegistrationInterview;
