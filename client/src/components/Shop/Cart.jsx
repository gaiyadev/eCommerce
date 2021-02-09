import React, { useEffect,useState } from "react";
import { Card, Container, Row, Button, Col } from "react-bootstrap";
import Navlink from "../Navigation/Navbar";
const Cart = () => {
  const [name, setname] = useState("")
  const [price, setprice] = useState("")
  const [qty, setqty] = useState("")
 
  

  const itemsAdd = () => {
    const items = JSON.parse(localStorage.getItem("cartItems"));
    items.map(p => {
      return console.log(p)
    })
    setname(items[0]["name"]);
    setprice(items[0]["price"]);
    setqty(items[0]["qty"]);
  };
  useEffect(() => {
  
  itemsAdd()
}, []);
  
  
  return (
    <>
      <br />
      <br />
      <Navlink />
      <Container>
        <Row>
          <Col md={8}>
            <Card>
              <h1>View carts</h1>
              <div> {name} </div>
              <div>{qty}</div>
              <div>{ price}</div>
            </Card>{" "}
            <br />
            <Button>CheckOut</Button>
          </Col>

          <Col md={4}>
            <Card>Cart is empty</Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
