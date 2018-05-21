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
import { NavLink, withRouter } from "react-router-dom";
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
    window.location.reload()
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
              <NavLink to="/index">
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
                <LinkContainer to="/login" activeClassName="nothing">
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
                <Panel.Body collapsible />
              </Panel>
              <Panel eventKey="2">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 1
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul>
                    <li>
                      <b>Ông Hồ Tấn Minh</b>
                      <div className="contact-info">
                        <p>
                          Chuyên viên phòng Giáo dục Trung Học - Sở GD-ĐT TP.HCM{" "}
                        </p>
                        <p>
                          <Glyphicon glyph="envelope" />
                          <a href="mailto:htminh@hcm.edu.vn">
                            {" "}
                            htminh@hcm.edu.vn
                          </a>.
                        </p>
                        <p>
                          <Glyphicon glyph="earphone" />
                          <a href="tel:0909881283"> 0909881283</a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel>
              <Panel eventKey="3">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 2
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="4">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 3
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="5">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 4
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="6">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 5
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="7">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 6
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="8">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 7
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="9">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 8
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="10">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 9
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="11">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 10
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="12">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 11
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="13">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN 12
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="14">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN THỦ ĐỨC
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="15">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN GÒ VẤP
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="16">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN BÌNH THẠNH
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="17">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN TÂN BÌNH
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="18">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN TÂN PHÚ
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="19">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN PHÚ NHUẬN
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="20">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO QUẬN BÌNH TÂN
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="21">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO HUYỆN CỦ CHI
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="22">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO HUYỆN NHÀ BÈ
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="23">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO HUYỆN BÌNH CHÁNH
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
              </Panel>
              <Panel eventKey="24">
                <Panel.Heading>
                  <Panel.Title toggle>
                    PHÒNG GIÁO DỤC VÀ ĐÀO TẠO HUYỆN CẦN GIỜ
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </Panel.Body>
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
