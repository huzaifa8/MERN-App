import React, { Component, useState } from "react";
import { Button, Form, Dropdown, DropdownButton, Card } from "react-bootstrap";
import Axios from "axios";

function EditForm(props) {
  var [prod, setProd] = useState([]);
  const [title, setTitle] = useState();
  const [desc, setdesc] = useState();
  const [price, setprice] = useState();
  const [category, setCategory] = useState();
  var path = window.location.pathname;
  var id = path.split("/");
  

  const getProduct = () => {
    
    Axios.get(
      "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/products/" +
        id[2]
    )
      .then((result) => {
        if (result.status === 200) {
          // console.log(result.data.title);
          console.log(result.data.title);
          prod.push(result.data)
          console.log(prod[0].title);
          setTitle(prod[0].title);
          setdesc(prod[0].description);
          setprice(prod[0].price);
          setCategory(prod[0].category);
          
          // console.log(AuthContext.authtokens);
        } else {
          console.log("fuckyou");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  

  React.useEffect(getProduct, []);
  return (
    <div>
      <Card>
        <Form>
          <Form.Group controlId="formBasicTitle">
            <Form.Control
              editable
              type="text"
              defaultValue={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Control
              type="text"
              defaultValue={desc}
              onChange={(e) => {
                setdesc(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPrice">
            <Form.Control
              type="text"
              defaultValue={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
          </Form.Group>
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

          <Button
            variant="primary"
            onClick={(e) => {
              Axios.put(
                "https://cors-anywhere.herokuapp.com/https://clothing-webmern.herokuapp.com/api/products/" +
                  id[2],
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
                    alert("Product SuccessFully Edited");

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
            }}
          >
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}
export default EditForm;
