import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
class ExportRegistrationInterview extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { registrationInterview } = this.props.dataToprint;
    console.log(registrationInterview);
    return (
      <div className="container document-print a4-style">
        <h4 className="text-right">
          <b>
            Mã hồ sơ:____{registrationInterview.ManagementUnit.Code +
              registrationInterview.Id}
          </b>
        </h4>
        <p className="text-right"><i>(Do cán bộ rà xoát hồ sơ ghi)</i></p>
        <h4 className="text-center header-a4">
          <b>PHIẾU THÔNG TIN ĐĂNG KÝ DỰ TUYỂN</b>
        </h4>
        <Row>
          <Col sm={6} xs={6}>
            <p>
              Họ và tên:{" "}
              <b>
                {registrationInterview.CandidateLastName +
                  " " +
                  registrationInterview.CandidateFirstName}
              </b>
            </p>
            <p>
              Ngày sinh:{" "}
              <b>{moment(registrationInterview.DOB).format("DD/MM/YYYY")}</b>
            </p>
          </Col>
          <Col sm={6} xs={6}>
            <p>
              Số CMND: <b>{registrationInterview.IdentifyCard}</b>
            </p>
          </Col>
        </Row>
        <p>
          Nơi ở hiện nay:<b>
            {" "}
            {registrationInterview.CurrentLivingAddress.HouseNumber +
              ", " +
              registrationInterview.CurrentLivingAddress.Ward.Type +
              " " +
              registrationInterview.CurrentLivingAddress.Ward.Name +
              ", " +
              registrationInterview.CurrentLivingAddress.Ward.District.Type +
              " " +
              registrationInterview.CurrentLivingAddress.Ward.District.Name +
              ", " +
              registrationInterview.CurrentLivingAddress.Ward.District.Province
                .Type +
              " " +
              registrationInterview.CurrentLivingAddress.Ward.District.Province
                .Name}
          </b>
        </p>
        <p>
          Hộ khẩu thường trú:<b>
            {" "}
            {registrationInterview.HouseHold.HouseNumber +
              ", " +
              registrationInterview.HouseHold.Ward.Type +
              " " +
              registrationInterview.HouseHold.Ward.Name +
              ", " +
              registrationInterview.HouseHold.Ward.District.Type +
              " " +
              registrationInterview.HouseHold.Ward.District.Name +
              ", " +
              registrationInterview.HouseHold.Ward.District.Province.Type +
              " " +
              registrationInterview.HouseHold.Ward.District.Province.Name}
          </b>
        </p>
        <Row>
          <Col sm={6} xs={6}>
            <p>
              Điện thoại: <b>{registrationInterview.PhoneNumber}</b>
            </p>
          </Col>
          <Col sm={6} xs={6}>
            <p>
              Email: <b>{registrationInterview.Email}</b>
            </p>
          </Col>
        </Row>

        <p>
          Trường Đào tạo: <b>{registrationInterview.UniversityName}</b>
        </p>
        <Row>
          <Col sm={4} xs={4}>
            <p>
              Tốt nghiệp:{" "}
              <b>{registrationInterview.GraduationClassfication.Name}</b>
            </p>
          </Col>
          <Col sm={4} xs={4}>
            <p>
              Hệ đào tạo: <b>{registrationInterview.TrainningCategory.Name}</b>
            </p>
          </Col>
          <Col sm={4} xs={4}>
            <p>
              Năm tốt nghiệp: <b>{registrationInterview.GraduatedAtYear}</b>
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={6} xs={6}>
            <p>
              Kiểu đào tạo:<b>
                {" "}
                {registrationInterview.IsNienChe ? "Niên chế" : "Tín chỉ"}
              </b>
            </p>
          </Col>
          <Col sm={6} xs={6}>
            <p>
              Xếp loại tốt nghiệp:{" "}
              <b>{registrationInterview.DegreeClassification.Name}</b>
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={6} xs={6}>
            <p>
              Điểm TB các môn học: <b>{registrationInterview.GPA}</b>
            </p>
          </Col>
          <Col sm={6} xs={6}>
            <p>
              Điểm TB luận văn:{" "}
              <b>
                {" "}
                {registrationInterview.IsNienChe
                  ? registrationInterview.CaptionProjectPoint
                  : null}
              </b>
            </p>
          </Col>
        </Row>
        <p>
          Trình độ cao nhất:{" "}
          <b>{registrationInterview.HighestLevelEducation.Name}</b>
        </p>
        {registrationInterview.Subject.PositionInterview.Id == "2" ? (
          <p>
            Chứng chỉ Nghiệp vụ sư phạm:'{" "}
            <b> {registrationInterview.IsHadNghiepVuSupham ? "Có" : "Không"}</b>
          </p>
        ) : null}

        <Row>
          <Col sm={8} xs={8}>
            <p>
              Nơi đăng ký dự tuyển:<b>
                {" "}
                {registrationInterview.ManagementUnit.FullName}
              </b>
            </p>
          </Col>
          <Col sm={4} xs={4}>
            <p>
              Bậc: <b>{registrationInterview.SchoolDegree.Notation}</b>
            </p>
          </Col>
        </Row>
        <p>
          Môn đăng kí dự tuyển:{" "}
          <b>
            {" "}
            {registrationInterview.Subject.PositionInterview.Name +
              " " +
              registrationInterview.Subject.Name}
          </b>
        </p>
        {registrationInterview.CreatedAtManagementUnitId == "26" ? (
          <Row>
            <Col sm={4} xs={4}>
              <p>
                Nguyện vọng 1:<b>
                  {" "}
                  {registrationInterview.District.Type +
                    " " +
                    registrationInterview.District.Name}
                </b>
              </p>
            </Col>
            <Col sm={4} xs={4}>
              <p>
                Nguyện vọng 2:<b>
                  {" "}
                  {registrationInterview.District1.Type +
                    " " +
                    registrationInterview.District1.Name}
                </b>
              </p>
            </Col>
            <Col sm={4} xs={4}>
              <p>
                Nguyện vọng 3:<b>
                  {" "}
                  {registrationInterview.District2.Type +
                    " " +
                    registrationInterview.District2.Name}
                </b>
              </p>
            </Col>
          </Row>
        ) : (
          <p>Cấp dạy: {registrationInterview.SchoolDegree.Name}</p>
        )}
        <Row>
          <Col sm={6} xs={6}>
            <p>
              Chứng chỉ Tin học:<b>
                {" "}
                {registrationInterview.InfomationTechnologyDegree.Name}
              </b>
            </p>
          </Col>
          <Col sm={6} xs={6}>
            <p>
              Chứng chỉ Ngoại ngữ:<b>
                {" "}
                {registrationInterview.ForeignLanguageCertification.Name}
              </b>
            </p>
          </Col>
        </Row>
        <p>
          Công tác trong ngành giáo dục:{" "}
          <b>{registrationInterview.StatusWorikingInEducation.Name}</b>
        </p>
        <p>
          <i>
            Thông tin lương (dành cho ứng viên có công tác và tham gia Bảo hiểm
            XH)
          </i>
        </p>
        <Row>
          <Col sm={4} xs={4}>
            <p>
              Năm vào ngành: <b>{registrationInterview.NamVaoNghanh}</b>
            </p>
          </Col>
          <Col sm={4} xs={4}>
            <p>
              Mã ngạch: <b>{registrationInterview.MaNgach}</b>
            </p>
          </Col>
          <Col sm={4} xs={4}>
            <p>
              Hệ số lương: <b>{registrationInterview.HeSoLuong}</b>
            </p>
          </Col>
        </Row>
        <p>
          Mốc nâng lương lần sau:{" "}
          <b>{registrationInterview.MocNangLuongLansau}</b>
        </p>
        <p>
          <i>
            <b>
              Tôi cam đoan những thông tin trên hoàn toàn đúng sự thật và chịu
              trách nhiệm về những thông tin đã đăng ký!
            </b>
          </i>
        </p>
        <Row className="signature">
          <p className="text-center">Ngày____tháng___năm {moment().year()}</p>
          <Col sm={6} xs={6}>
            <p className="text-center">
              <b>Cán bộ kiểm tra: </b>
            </p>
            <p className="text-center">
              <i>(Ký và ghi rõ họ tên)</i>
            </p>
          </Col>
          <Col sm={6} xs={6}>
            <p className="text-center">
              <b>Người đăng ký:</b>
            </p>
            <p className="text-center">
              <i>(Ký và ghi rõ họ tên)</i>
            </p>
          </Col>
        </Row>
        <p>
          <i>
            <b>Người dự tuyển cần lưu ý</b>
          </i>
        </p>
        <ul>
          <li>
            <i>
              In phiếu này ra giấy ( 02 bản: 1 bản nộp cho cán bộ rà soát dữ
              liệu ứng viên)
            </i>
          </li>
          <li>
            <i>
              Khi tham dự rà soát hồ sơ ứng viên mang 1 bộ hồ sơ hoàn chỉnh theo
              Kế hoạch tuyển dụng; hồ sơ phải được sao y chứng thực hoặc mang
              theo bản chính để đối chứng.
            </i>
          </li>
          <li>
            <i>
              Đề nghị ứng viên thường xuyên theo dõi thông tin, thông báo trên
              websie của {registrationInterview.ManagementUnit.FullName}
            </i>
          </li>
        </ul>
      </div>
    );
  }
}

export default ExportRegistrationInterview;
