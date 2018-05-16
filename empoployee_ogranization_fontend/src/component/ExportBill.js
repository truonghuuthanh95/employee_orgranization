import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
class ExportBill extends Component {
  render() {
    return (
      <div className="container bill-print">
        
        <Row>
          <Col sm={8} xs={8}>
            <p>SỞ GIÁO DỤC VÀ ĐÀO TẠO TP.HỒ CHÍ MINH</p>
            <p>
              <i>66-68 Lê Thánh Tôn Phường Bến Nghé Quận 1 TP.HCM</i>
            </p>
          </Col>
          <Col sm={4} xs={4}>
            <h4>
              Mã hồ sơ: <b>1231</b>
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
            Họ, tên người nộp: <b>Trương Hữu Thành</b>
          </p>
          <p>
            Số CMND: <b>12345678</b>
          </p>
          <p>
            Nội dung nộp: <b>Lệ phí dự tuyển viên chức 2018</b>
          </p>
          <p>
            Số tiền thu: <b>30.000 VND</b> (Viết bằng chữ):{" "}
            <b>Ba mươi ngàn đồng</b>
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
              Ứng viên vui lòng đến SỞ GIÁO DỤC VÀ ĐÀO TẠO TP.HỒ CHÍ MINH vào
              ngày 22/12/2018 để rà xoát hồ sơ (<i>
                Mục đích là để đối chiếu hồ sơ với bản khai. Vui lòng tới đúng
                giờ
              </i>)
            </li>
            <li>
              Khi đi ứng viên vui lòng in hố sơ ứng tuyển thành 2 bản, sau khi
              đã hoàn tất cập nhật hồ sơ ứng tuyển
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ExportBill;
