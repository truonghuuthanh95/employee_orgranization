import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  Image,
  Glyphicon,
  Modal,
  Button,
  NavDropdown,
  MenuItem,
  PanelGroup,
  Panel
} from "react-bootstrap";
import { NavLink, withRouter, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenMenuUser: false,
      isOpen: false,
      showModalContact: false,
      user: null
    };
    this.handelShowContact = this.handelShowContact.bind(this);
    this.handleCloseContact = this.handleCloseContact.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user !== null) {
      this.setState({ user: user });
    }
  }

  handelShowContact() {
    this.setState({ showModalContact: true });
  }

  handleCloseContact() {
    this.setState({ showModalContact: false });
  }
  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };
  handleLogout() {
    sessionStorage.removeItem("user");
    this.props.history.push("/");
    window.location.reload();
  }

  render() {
    let username = "error";
    if (this.state.user !== null) {
      username = `Chào, ${this.state.user.Name}`;
    }
    return (
      <div>
        <Navbar collapseOnSelect className="header-color">
          <Navbar.Header>
            <Navbar.Brand className="logo-style-padding-top">
              <NavLink to="/">
                <Image
                  src={require("../resourse/image/logo_so.png")}
                  rounded
                  className="logo-style"
                />
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullLeft className="nav-link">
              <LinkContainer to="/" activeClassName="nothing">
                <NavItem eventKey={1}>
                  <Glyphicon glyph="home" /> Trang Chủ
                </NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight className="nav-link">
              <NavItem eventKey={1} href="#" onClick={this.handelShowContact}>
                <Glyphicon glyph="earphone" /> Liên Hệ
              </NavItem>
            </Nav>
            {this.state.user === null ? (
              <Nav pullRight className="nav-link">
                <LinkContainer to="/#/login" activeClassName="nothing">
                  <NavItem eventKey={1}>
                    <Glyphicon glyph="log-in" /> Đăng Nhập
                  </NavItem>
                </LinkContainer>
              </Nav>
            ) : null}
            {this.state.user !== null ? (
              <Nav pullRight className="nav-link">
                <NavDropdown
                  // eventKey={}
                  title={this.state.user !== null ? username : "nothing"}
                  id="basic-nav-dropdown"
                  onMouseEnter={this.handleOpen}
                  onMouseLeave={this.handleClose}
                  open={this.state.isOpen}
                  onToggle={this.handleOpen}
                  noCaret
                >
                  <MenuItem>
                    {" "}
                    <Glyphicon glyph="cog" /> Đổi Mật Khẩu
                  </MenuItem>
                  <MenuItem divider />
                  {this.state.user.RoleId == "3" ? (
                    <MenuItem>
                      {/* <Link to="xuathoadondangki" activeClassName="nothing">
                        <Glyphicon glyph="file" /> Xuất hóa đơn
                      </Link> */}
                      <LinkContainer to="xuathoadondangki">
                        <span><Glyphicon glyph="file" /> Xuất hóa đơn</span>
                      </LinkContainer>
                    </MenuItem>
                  ) : null}
                  <MenuItem divider />
                  <MenuItem onClick={this.handleLogout}>
                    {" "}
                    <Glyphicon glyph="log-out" /> Đăng Xuất
                  </MenuItem>
                </NavDropdown>
              </Nav>
            ) : null}
          </Navbar.Collapse>
        </Navbar>
        <Modal
          show={this.state.showModalContact}
          onHide={this.handleCloseContact}
          bsSize="large"
        >
          <Modal.Header closeButton>
            <Modal.Title>Liên hệ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PanelGroup accordion id="accordion-example">
              <Panel eventKey="1">
                <Panel.Heading>
                  <Panel.Title toggle>
                    SỞ GIÁO DỤC VÀ ĐÀO TẠO TP.HỒ CHÍ MINH
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul>
                    <li>
                      <b>Ông Lê Hông Quân</b>
                      <div className="contact-info">
                        <p>
                          Chuyên viên phòng Tổ chức cán bộ - Sở GD-ĐT TP.HCM{" "}
                        </p>
                        <p>
                          <Glyphicon glyph="envelope" />
                          <a href="mailto:lehongquan220782@gmail.com">
                            {" "}
                            lehongquan220782@gmail.com
                          </a>.
                        </p>
                        <p>
                          <Glyphicon glyph="earphone" />
                          <a href="tel:0965999879"> 0965 999 879</a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel>
              <Panel eventKey="2">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 1
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chưa có</Panel.Body>
              </Panel>
              <Panel eventKey="3">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 2
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="4">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 3
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="5">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 4
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="6">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 5
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="7">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 6
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="8">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 7
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="9">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 8
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="10">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 9
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="11">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 10
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="12">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 11
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="13">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 12
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="14">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN THỦ ĐỨC
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="15">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN GÒ VẤP
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="16">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN BÌNH THẠNH
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="17">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN TÂN BÌNH
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="18">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN TÂN PHÚ
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="19">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN PHÚ NHUẬN
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="20">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN BÌNH TÂN
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="21">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO HUYỆN CỦ CHI
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="22">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO HUYỆN NHÀ BÈ
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="23">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO HUYỆN BÌNH CHÁNH
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
              <Panel eventKey="24">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO HUYỆN CẦN GIỜ
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>Chứa có</Panel.Body>
              </Panel>
            </PanelGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseContact}>Đóng</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default withRouter(Header);
