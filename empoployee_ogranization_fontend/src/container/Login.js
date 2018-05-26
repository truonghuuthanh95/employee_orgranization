import React, { Component } from "react";
import {
  FormGroup,
  InputGroup,
  FormControl,
  Glyphicon,
  Col,
  Panel,
  Button,
  Image,
  HelpBlock
} from "react-bootstrap";
import { requestLogin } from "../api/guestAPI";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      errorUsername: undefined,
      errorPassword: undefined,
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
  async _validUsernamePassword() {
    const { username, password } = this.state;
    if (username === "" || password === "") {
      if (username === "") {
        this.setState({ errorUsername: "Vui lòng nhập tên đăng nhập" });
      }
      else{
        this.setState({errorUsername: undefined})
      }
      if (password === "") {
        this.setState({ errorPassword: "Vui lòng nhập mật khẩu" });
      }
      else { 
        this.setState({errorPassword: undefined})
      }
      return false;
    }
    this.setState({
      errorPassword: undefined,
      errorUsername: undefined,
    });

    return true;
  }
  async handleClickLogin(event) {
    event.preventDefault();
    await this._validUsernamePassword().then(async result => {
      if (result === true) {
        await requestLogin(this.state.username, this.state.password).then(
          res => {
            if (res.error !== undefined) {
              this.setState({ message: res.error_description });
            } else {
              sessionStorage.setItem("user", JSON.stringify(res));
              debugger
              if (res.RoleName === 'cashier') {
                this.props.history.push("/xuathoadondangki");
              }   else {
this.props.history.push('/')      
              } 
                 
            }
          }
        );
      }
    });
  }
  render() {
    return (
      <div>
        <Col sm={12} className="login-backgound">
        <Col sm={4} smOffset={4} className="login-box">
          <Panel>
            <form onSubmit={this.handleClickLogin}>
              <Panel.Body>
                <div className="text-center">
                  <Image
                    src={require("../resourse/image/logo_so.png")}
                    className="logo-login"
                  />
                </div>

                <FormGroup
                  validationState={
                    this.state.errorUsername !== undefined ? "error" : null
                  }
                >
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
                      bsSize="large"
                    />
                  </InputGroup>
                  <FormControl.Feedback />
                  <HelpBlock bsStyle>{this.state.errorUsername}</HelpBlock>
                </FormGroup>
                <FormGroup
                  validationState={
                    this.state.errorPassword !== undefined ? "error" : null
                  }
                >
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
                      bsSize="large"
                    />
                  </InputGroup>
                  <FormControl.Feedback />
                  <HelpBlock bsStyle>{this.state.errorPassword}</HelpBlock>
                </FormGroup>
                <p className="text-center text-danger">{this.state.message}</p>
              </Panel.Body>
              <Panel.Footer>
                <Button bsStyle="success" bsSize="large" type="submit" block>
                  ĐĂNG NHẬP
                </Button>
              </Panel.Footer>
            </form>
          </Panel>
        </Col>
        </Col>
      </div>
    );
  }
}

export default Login;
