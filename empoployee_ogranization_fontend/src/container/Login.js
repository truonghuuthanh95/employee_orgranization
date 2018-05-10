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

class Login extends Component {
  render() {
    return (
      <div>
        <Col sm={4} mdOffset={4} className="login-box">
          <Panel>
            <Panel.Body>
              <div className="text-center">
                <Image
                  src={require("../resourse/image/logo_so.png")}
                  className="logo-login"
                />
              </div>
              <form>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>
                      <Glyphicon glyph="user" />
                    </InputGroup.Addon>
                    <FormControl type="text" placeholder="Tên đăng nhập" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon>
                      <Glyphicon glyph="lock" />
                    </InputGroup.Addon>
                    <FormControl type="password" placeholder="Mật khẩu" />
                  </InputGroup>
                </FormGroup>
              </form>
            </Panel.Body>
            <Panel.Footer>
              <Button bsStyle="primary" block>
                Đăng Nhập
              </Button>
            </Panel.Footer>
          </Panel>
        </Col>
      </div>
    );
  }
}

export default Login;
