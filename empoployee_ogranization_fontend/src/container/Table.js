import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import TableCaption from "../component/TableCaption";
import { Col } from "react-bootstrap";
const CaptionElement = () => (
  <h3
    style={{
      borderRadius: "0.25em",
      textAlign: "center",
      color: "purple",
      border: "1px solid purple",
      padding: "0.5em"
    }}
  >
    Component as Header
  </h3>
);

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          dataField: "id",
          text: "Product ID"
        },
        {
          dataField: "name",
          text: "Product Name"
        },
        {
          dataField: "price",
          text: "Product Price"
        }
      ],
      product: [
        {
          id: 1,
          name: "thanh",
          price: 1000
        },
        {
            id: 2,
            name: "thanh",
            price: 1000
          }
      ],
      selectRow: {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        bgColor: "#00BFFF"
      }
    };
  }

  render() {
    return (
      <div>
        <Col md={8} mdOffset={2}>
          <BootstrapTable
            keyField="id"
            data={this.state.product}
            columns={this.state.columns}
            selectRow={this.state.selectRow}
            caption={<TableCaption />}
            striped
            hover
            condensed
            bordered={ false }
          />
        </Col>
      </div>
    );
  }
}

export default Table;
