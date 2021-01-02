import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import React, { useState } from "react";
import {
  Form,
  Button,
  DropdownButton,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import Axios from "axios";
function AddProduct() {
  const [title, setTitle] = useState();
  const [desc, setdesc] = useState();
  const [price, setprice] = useState();
  const [category, setCategory] = useState("Select Category");

  function AddProduct() {
    Axios.post(
      "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/products/",
      {
        title: title,
        description: desc,
        price: price,
        category: category,
      },
      {
        header: { "Content-Type": "application/json" },
      }
    )
      .then((result) => {
        if (result.status === 200) {
          //setproducts(result.data);
          console.log(result);
          alert("Product SuccessFully Added");
          // console.log(AuthContext.authtokens);
        }
        if (result.status == 400) {
          alert("dasdsadasf");
        }
      })
      .catch((e) => {
        alert(e);
        console.log(e);
      });
  }
  return (
    <Form style={{ padding: "20px" }}>
      <Form.Group controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter Title"
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setdesc(e.target.value);
          }}
          placeholder="Enter Description"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => {
            setprice(e.target.value);
          }}
          placeholder="Enter price"
        />
      </Form.Group>
      <Row sm={12} lg={12}>
        <Col sm={6} lg={4}>
          <DropdownButton
            alignRight
            title={category}
            id="dropdown-menu-align-right"
            onSelect={(e) => {
              setCategory(e);
              console.log(e);
            }}
          >
            <Dropdown.Item eventKey="Polo">Polo</Dropdown.Item>
            <Dropdown.Item eventKey="Tees">TEES</Dropdown.Item>
            <Dropdown.Item eventKey="Formal">Formal</Dropdown.Item>
            <Dropdown.Divider />
          </DropdownButton>
        </Col>
        <Col sm={6} lg={8}>
          <Button
            variant="primary"
            onClick={AddProduct}
            style={{ float: "right" }}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
export default AddProduct;
