import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import PropTypes from "prop-types";
class ExportBill extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      managementUnit,
      candidateName,
      identifyCard,
      registrationId,
      registrationPrice
    } = this.props.dataToprint;
    console.log()
        console.log( managementUnit !== undefined &&
        candidateName !== undefined &&
        identifyCard !== undefined &&
        registrationId !== undefined &&
        registrationPrice !== undefined)
    if (
        candidateName !== undefined &&
        identifyCard !== undefined &&
        registrationId !== undefined &&
        registrationPrice !== undefined
    ) {
      return (
        <div className="container bill-print">
          <Row>
            <Col sm={8} xs={8}>
              <p>{managementUnit !== "" ? managementUnit.FullName : null}</p>
              <p>
                <i>{managementUnit !== "" ? managementUnit.Address : null}</i>
              </p>
            </Col>
            <Col sm={4} xs={4}>
              <h4>
                Mã hồ sơ: <b>{registrationId !== "" ? registrationId : null}</b>
              </h4>
            </Col>
          </Row>

          <h3 className="text-center bill">
            <b>BIÊN LAI THU TIỀN</b>
          </h3>
          <p className="text-center">
            <i>
              Ngày {moment().date()} tháng {moment().month() + 1} năm{" "}
              {moment().year()}
            </i>
          </p>
          <Col xs={8} xsOffset={2} sm={8} smOffset={2} className="bill">
            <p>
              Họ, tên người nộp:{" "}
              <b>{candidateName !== "" ? candidateName : null}</b>
            </p>
            <p>
              Số CMND: <b>{identifyCard !== "" ? identifyCard : null}</b>
            </p>
            <p>
              Nội dung nộp: <b>Lệ phí dự tuyển viên chức {moment().year()}</b>
            </p>
            <p>
              Số tiền thu:{" "}
              <b>{registrationPrice !== "" ? registrationPrice.Value : null}</b>{" "}
              (Viết bằng chữ):{" "}
              <b>
                {registrationPrice !== ""
                  ? registrationPrice.ValueByWord
                  : null}
              </b>
            </p>
          </Col>
          <Row>
            <Col sm={6} xs={6} className="bill">
              <p className="text-center">
                <b>Người nộp tiền</b>
              </p>
              <p className="text-center">
                <i>(Ký và ghi rõ họ tên)</i>
              </p>
            </Col>
            <Col sm={6} xs={6} className="bill">
              <p className="text-center">
                <b>Người thu tiền</b>
              </p>
              <p className="text-center">
                <i>(Ký và ghi rõ họ tên)</i>
              </p>
            </Col>
          </Row>
          <div className="warning-box">
            <p>
              <b>Lưu ý: </b>
            </p>
            <ul>
              <li>
                Ứng viên vui lòng truy cập vào{" "}
                <b>http://tuyendung/hosoungtuyen</b> để cập nhập hồ sơ ứng tuyển
              </li>
              <li>
                Ứng viên vui lòng đến{" "}
                <b>
                  {registrationPrice !== "" ? registrationPrice.Address : null}
                </b>{" "}
                vào ngày <b>22/12/2018</b> để rà xoát hồ sơ (<i>
                  Mục đích là để đối chiếu hồ sơ với bản khai. Vui lòng tới đúng
                  giờ
                </i>)
              </li>
              <li>
                Khi đi ứng viên vui lòng in hố sơ ứng tuyển thành <b>2 bản</b>,
                sau khi đã hoàn tất cập nhật hồ sơ ứng tuyển
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return <div />;
  }
}
export default ExportBill;
