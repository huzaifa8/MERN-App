import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import logoImg from "../img/logo.png";
import { Form, Input, Button, Error } from "../Components/AuthForm";
import axios from "axios";
import { useAuth } from "../Context/auth";
import Admin from "./Admin";
import { Row, Col } from "react-bootstrap";
// import referer from "react-referer";
function Login(props) {
  // console.log(props);
  //localStorage.clear();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const path = props.history.location.state;
  //console.log(localStorage.getItem("tokens"));

  //const BrowserHistory = require('react-router/lib/BrowserHistory').default;

  function postLogin() {
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/users/login",
        {
          email: userName,
          password: password,
        },
        {
          header: { "Content-Type": "application/json" },
        }
      )
      .then((result) => {
        if (result.status === 200 && result.data.role == "admin") {
          console.log("helloworld");
          setAuthTokens(result.data);
          setLoggedIn(true);
          console.log("before redirect");
          return <Redirect to="/Admin" />;
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
        console.log(e);
      });
  }

  // if (isLoggedIn) {

  //     return <Redirect to='/Admin' />;

  // }
  return isLoggedIn ? (
    <Admin />
  ) : (
    <>
      <Col sm={12} lg={6} style={{ margin: "20px auto" }}>
        <Form>
          <Input
            type="username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="Email"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <Button onClick={postLogin} href="/Admin">
            Sign In
          </Button>
        </Form>
      </Col>
      {isError && (
        <Error>The username or password provided were incorrect!</Error>
      )}
    </>
  );
}

export default Login;
