import React, { Component, useState } from "react";
import axios from "axios";
import SingleProduct from "./SingleProduct";
import { Card, Button, Row, Col } from "react-bootstrap";
import $ from "jquery";
import { useCart } from "../Context/cartContext";
import CategoryDisplay from "./CategoryDisplay";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

function Home(props) {
  var [products, setproducts] = useState([]);
  const { setCart } = useCart();
  var [shopCart, setShopcart] = useState([]);
  const [token, settokens] = useState(localStorage.getItem("tokens"));

  $("#rating img").click(function () {
    let a = $(this).prop("id");

    $(this).addClass("yellow1");
    $(this).prevAll().addClass("yellow1");
    $(this).nextAll().removeClass("yellow1");
    $(this).nextAll().removeClass("yellow");
  });
  $("#rating img").hover(
    function () {
      $(this).addClass("yellow");
      $(this).prevAll().addClass("yellow");
    },
    function () {
      $(this).removeClass("yellow");
      $(this).prevAll().removeClass("yellow");
    }
  );

  function getProducts() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/products/"
      )
      .then((result) => {
        if (result.status === 200) {
          setproducts(result.data);
        } else {
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  var i = 0;

  React.useEffect(getProducts, []);
  return (
    <div>
      <Row style={{ margin: "10px" }}>
        {products.map((pro, index) => {
          return (
            <Col xs={12} sm={12} md={4} lg={3}>
              <Card style={{ marginBottom: "10px" }}>
                <a href={"/SingleProduct/" + pro._id}>
                  <Card.Img variant="top" src={require("../img/shirts.jpg")} />
                </a>
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
                  <div id="rating">
                    <img id="1" src={require("../img/star.png")} alt="" />
                    <img id="2" src={require("../img/star.png")} alt="" />
                    <img id="3" src={require("../img/star.png")} alt="" />
                    <img id="4" src={require("../img/star.png")} alt="" />
                    <img id="5" src={require("../img/star.png")} alt="" />
                  </div>
                  {token ? (
                    <>
                      <Button
                        variant="danger"
                        href={"/form/" + pro._id}
                        style={{ width: "50%" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="warning"
                        style={{ width: "50%" }}
                        onClick={(e) => {
                          axios
                            .delete(
                              "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/products/" +
                                pro._id
                            )
                            .then((result) => {
                              if (result.status === 200) {
                                //setproducts(result.data);
                                products.splice(index, 1);
                                setproducts(products);
                                console.log(products);
                                alert("Product Deleted");
                                getProducts();
                                // console.log(AuthContext.authtokens);
                              } else {
                              }
                            })
                            .catch((e) => {
                              console.log(e);
                            });
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      style={{ width: "100%" }}
                      onClick={() => {
                        if (localStorage.getItem("cart") != null) {
                          console.log("nullllllll");
                          console.log(
                            JSON.parse([localStorage.getItem("cart")])
                          );
                          var arr = JSON.parse([localStorage.getItem("cart")]);
                          shopCart = arr;
                          shopCart.push(pro);
                          setShopcart(shopCart);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(shopCart)
                          );
                        } else {
                          shopCart.push(pro);
                          setShopcart(shopCart);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(shopCart)
                          );
                        }
                      }}
                    >
                      Add to cart
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
export default Home;
