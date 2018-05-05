import React, { Component } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
class TableCaption extends Component {
  render() {
    return (
      <div>
        <ButtonGroup>
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default TableCaption;
