import React, { Component, useState } from "react";
import { CardDeck, Card, Tab, Row, Col, Nav, Button } from "react-bootstrap";
import { useCart } from "../Context/cartContext";
import axios from "axios";
function CategoryDisplay(props) {
  const [category, setCategory] = useState(props.cat);
  const [products, setproducts] = useState([]);
  var [shopCart, setShopcart] = useState([]);
  const { setCart } = useCart();
  function addTocart() {}
  function getProducts() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/products/cat/" +
          category
      )
      .then((result) => {
        if (result.status === 200) {
          setproducts(result.data);
          console.log(products);
          // console.log(AuthContext.authtokens);
        } else {
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  React.useEffect(getProducts, []);

  return (
    <Row style={{ margin: "10px" }}>
      {products.map((pro) => {
        return (
          <Col xs={12} sm={12} md={4} lg={2}>
            <Card>
              <Card.Img variant="top" src={require("../img/shirts.jpg")} />
              <Card.Body>
                <Card.Title>{pro.title}</Card.Title>
                <Card.Subtitle>Price: {pro.price}PKR</Card.Subtitle>
                <p
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    height: "24px",
                    margin: "5px 0",
                  }}
                >
                  {pro.description}
                </p>
                <Button
                  variant="success"
                  onClick={() => {
                    if (localStorage.getItem("cart") != null) {
                      console.log("nullllllll");
                      console.log(JSON.parse([localStorage.getItem("cart")]));
                      var arr = JSON.parse([localStorage.getItem("cart")]);
                      shopCart = arr;
                      console.log(shopCart);
                      shopCart.push(pro);
                      setShopcart(shopCart);
                      localStorage.setItem("cart", JSON.stringify(shopCart));
                    } else {
                      console.log(shopCart);
                      shopCart.push(pro);
                      setShopcart(shopCart);
                      localStorage.setItem("cart", JSON.stringify(shopCart));
                    }
                  }}
                >
                  Add to cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default CategoryDisplay;
