import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import logoImg from "../img/logo.png";
import { Card, Logo, Form, Input, Button } from "../Components/AuthForm";
import axios from "axios";
import { useAuth } from "../Context/auth";
import referer from "react-referer";

function Signup(props) {
  //const referer = props.location.state.referer || "/";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const { setAuthTokens } = useAuth();
  var token;

  function postSignup() {
    const res = axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/users/register",
        {
          name: firstName,
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )

      .then((result) => {
        token = result.data.token;
        console.log(token);
        if (result.status === 200) {
          setAuthTokens(result.data);
          console.log(isLoggedIn);

          setLoggedIn(true);
          console.log(isLoggedIn);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Card>
      <Form>
        <Input
          type="name"
          value={firstName}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          placeholder="Name"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />

        <Button onClick={postSignup}>Sign up</Button>
      </Form>
    </Card>
  );
}

export default Signup;
