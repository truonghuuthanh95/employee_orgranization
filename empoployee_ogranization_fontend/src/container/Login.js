import React, { Component } from "react";
import {
  FormGroup,
  InputGroup,
  FormControl,
  Glyphicon,
  Col,
  Panel,
  Button,
  Image
} from "react-bootstrap";
import { requestLogin } from "../api/guestAPI";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  async handleClickLogin(event) {
    event.preventDefault();
    await requestLogin(this.state.username, this.state.password).then(res => {
      if (res.error !== undefined) {
        debugger;
        this.setState({ message: res.error_description });
      } else {
        sessionStorage.setItem("user", JSON.stringify(res));
        // debugger
        this.props.history.push("/");
      }
    });
  }
  render() {
    return (
      <div>
        <Col sm={4} mdOffset={4} className="login-box">
          <Panel>
            <form onSubmit={this.handleClickLogin}>
              <Panel.Body>
                <div className="text-center">
                  <Image
                    src={require("../resourse/image/logo_so.png")}
                    className="logo-login"
                  />
                </div>

                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>
                      <Glyphicon glyph="user" />
                    </InputGroup.Addon>
                    <FormControl
                      type="text"
                      placeholder="Tên đăng nhập"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>
                      <Glyphicon glyph="lock" />
                    </InputGroup.Addon>
                    <FormControl
                      type="password"
                      placeholder="Mật khẩu"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                </FormGroup>
                <p className="text-center text-danger">{this.state.message}</p>
              </Panel.Body>
              <Panel.Footer>
                <Button bsStyle="primary" type="submit" block>
                  Đăng Nhập
                </Button>
              </Panel.Footer>
            </form>
          </Panel>
        </Col>
      </div>
    );
  }
}

export default Login;
