import React, { Component, useState } from "react";
import { useCart } from "../Context/cartContext";
import { Link, Redirect } from "react-router-dom";
import { ListGroup, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

function ShoppingCart(props) {
  var [cart, SetCart] = useState([]);

  const [name, Setname] = useState();
  const [number, setNumber] = useState();
  const [address, setAddress] = useState();
  var [tPrice, setTprice] = useState();
  var [titlearr, setTitle] = useState([]);

  var arr = JSON.parse([localStorage.getItem("cart")]);
  cart = arr;
  if (cart.length == 0) {
    console.log("hello");
    alert("Cart is empty");
    return <Redirect to="/"></Redirect>;
  }
  // console.log(cart);
  //SetCart()
  function calPrice() {
    var p = 0;
    cart.map((c, index) => {
      p = p + parseInt(c.price, 10);
    });
    return p;
  }
  function submitOrder() {
    cart.map((ca, index) => {
      titlearr.push(ca.title);

      setTitle(titlearr.concat(ca.title));
    });

    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/orderConfirmed",
        {
          title: titlearr,
          Cname: name,
          Cnumber: number,
          totalPrice: calPrice(),
          adress: address,
        },
        {
          header: { "Content-Type": "application/json" },
        }
      )
      .then((result) => {
        localStorage.removeItem("cart");
        SetCart();
        return <Redirect to="/" />;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <div>
        {cart.map((ca, index) => {
          return (
            <ListGroup
              variant="flush"
              style={{ borderBottom: "2px solid #000" }}
            >
              <ListGroup.Item key={index}>
                <h4>Title: {ca.title}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Price: {ca.price}PKR</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Description: {ca.description}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  variant="danger"
                  style={{ float: "right" }}
                  onClick={() => {
                    calPrice();
                    cart.splice(index, 1);
                    SetCart(cart);
                    localStorage.setItem("cart", JSON.stringify(cart));
                  }}
                >
                  Remove From Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </div>
      <div style={{ margin: "8px 20px" }}>
        <Form>
          <Form.Group
            controlId="formBasicName"
            style={{ borderBottom: "2px solid #000" }}
          >
            <h5 style={{ textAlign: "center" }}>
              Total Price: {calPrice()}PKR
            </h5>
          </Form.Group>
          <h4 style={{ textAlign: "center" }}>Customer Details</h4>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => {
                Setname(e.target.value);
              }}
              type="Name"
              placeholder="Enter Name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              type="Number"
              placeholder="Enter Number"
            />
          </Form.Group>

          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="Text"
              placeholder="Enter Address"
            />
          </Form.Group>

          <Button variant="primary" onClick={submitOrder}>
            Place Order
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ShoppingCart;
