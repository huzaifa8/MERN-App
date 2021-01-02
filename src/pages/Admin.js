import React from "react";
import { Button } from "../Components/AuthForm";
import { useAuth } from "../Context/auth";

import Axios from "axios";
import { CardDeck, Card, Row, Col } from "react-bootstrap";
//import { myContext } from "../App";
function Admin(props) {
  const { setAuthTokens } = useAuth();
  const [order, setOrder] = React.useState([]);

  function getProducts() {
    Axios.get(
      "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/orderConfirmed/"
    )
      .then((result) => {
        if (result.status === 200) {
          //setproducts(result.data);
          console.log(result.data);
          setOrder(result.data);
          console.log(order);
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
    <div style={{ padding: "10px 20px" }}>
      <h1>Confirmed Orders</h1>
      <Row
        sm={12}
        xs={12}
        md={12}
        lg={12}
        style={{ justifyContent: "space-around" }}
      >
        {order.map((pro) => {
          return (
            <Col
              sm={12}
              xs={12}
              md={5}
              lg={5}
              style={{ textAlign: "left", marginBottom: "10px" }}
            >
              <Card>
                <Card.Body>
                  <Card.Title>{pro.title} </Card.Title>
                  <Card.Subtitle>Price: {pro.totalPrice}Pkr</Card.Subtitle>
                  <Card.Subtitle>Customer Name: {pro.Cname}</Card.Subtitle>
                  <Card.Subtitle>Customer Number: {pro.Cnumber}</Card.Subtitle>
                  <Card.Subtitle>Customer Address: {pro.adress}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Admin;
