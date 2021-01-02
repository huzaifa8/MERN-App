import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./Context/auth";
import { cartContext } from "./Context/cartContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CategoryDisplay from "./pages/CategoryDisplay";
import ShoppingCart from "./pages/ShoppingCart";
import AddProduct from "./pages/AddProduct";
import EditForm from "./pages/EditForm";
import { Button, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SingleProduct from "./pages/SingleProduct";
//import Switch from "react-bootstrap/esm/Switch";
//export const myContext = React.createContext();
function App(props) {
  const [authtokens, setAuthTokens] = useState(localStorage.getItem("tokens"));

  var [Shoppingcart, setCart] = useState([]);

  console.log("App.js shoop cart", Shoppingcart);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };
  const setTShopcart = (data) => {
    //if (Shoppingcart.length == 0) {

    // setCart(JSON.parse(localStorage.getItem("cart")));

    // if (Shoppingcart.length == 0) {
    Shoppingcart.push(data);
    setCart(Shoppingcart);
    localStorage.setItem("cart", JSON.stringify(Shoppingcart));
    // } else {
    // console.log("called setCart context");
    // setCart(localStorage.getItem("cart"));
    // console.log(JSON.parse(localStorage.getItem("cart")));
    // localStorage.removeItem("cart");
    // Shoppingcart.push(data);
    // setCart(Shoppingcart);
    // localStorage.setItem("cart", JSON.stringify(Shoppingcart));
    // }

    //return;
    //}
    // setCart(Shoppingcart.concat(data));
    // localStorage.setItem("cart", JSON.stringify(Shoppingcart));
    // } else {
    //   Shoppingcart.concat(data);
    //   setCart(Shoppingcart);
    //   localStorage.setItem("cart", JSON.stringify(Shoppingcart));
    // }

    // Shoppingcart.push(data);
    // localStorage.setItem("cart",JSON.stringify(Shoppingcart));
    // setCart(Shoppingcart);
    // console.log(Shoppingcart);

    //Shoppingcart.push(data);
    localStorage.setItem("cart", JSON.stringify(Shoppingcart));
  };

  //console.log("next", localStorage.getItem("tokens"));
  console.log("in app.js outside if", authtokens);
  // if (authtokens) {
  //   console.log("in app.js inside if  exist", authtokens);
  //  // document.getElementById("loggedin").style.display = "none";
  // }

  return (
    <AuthContext.Provider value={{ authtokens, setAuthTokens: setTokens }}>
      <cartContext.Provider value={{ Shoppingcart, setCart: setTShopcart }}>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/shoppingcart">Shopping Cart</Nav.Link>
                <Nav.Link href="/categorypolo">Polo Shirts</Nav.Link>
                <Nav.Link href="/categoryTees">Tees</Nav.Link>
                <Nav.Link href="/categoryformal">Formal Shirts</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/Contactus">Contact Us</Nav.Link>
                {authtokens ? (
                  <>
                    <Nav.Link href="/Admin">Admin Page</Nav.Link>
                    <Nav.Link
                      onClick={(e) => {
                        setAuthTokens();
                        localStorage.removeItem("tokens");
                      }}
                      href="/"
                    >
                      Logout
                    </Nav.Link>
                    <Nav.Link href="/AddProduct">Add Product</Nav.Link>
                  </>
                ) : (
                  <Nav.Link href="/login">Admin Login</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Router>
            <Route exact path="/" render={(props) => <Home />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />

            <Route
              exact
              path="/shoppingcart"
              render={(props) => <ShoppingCart />}
            />
            <Route
              exact
              path="/categorypolo"
              render={(props) => <CategoryDisplay {...props} cat={"Polo"} />}
            />
            <Route
              exact
              path="/categoryTees"
              render={(props) => <CategoryDisplay {...props} cat={"Tees"} />}
            />
            <Route
              exact
              path="/categoryFormal"
              render={(props) => <CategoryDisplay {...props} cat={"Formal"} />}
            />
            <Route
              exact
              path="/SingleProduct/:id"
              render={(props) => <SingleProduct />}
            />
            <Route
              exact
              path="/Addproduct"
              render={(props) => <AddProduct />}
            />
            <Route exact path="/form/:id" render={(props) => <EditForm />} />
            <PrivateRoute path="/Admin" component={Admin} />
          </Router>
        </div>
      </cartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
