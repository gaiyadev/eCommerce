import React from "react";
import { Card, Row, Button, Col } from "react-bootstrap";

const Cart = ({ cart }) => {
  const addToCartHandler = (id) => {
    console.log(">>>Id", id);
  };

  const viewProductHandler = (id) => {
    console.log("View>>>", id);
  };
  const cardList = cart.allProduct.map((cart) => {
    return (
      <Col md={3}>
        <Card.Body key={cart._id}>
          <Card.Title> {cart.name} </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {cart.price}
          </Card.Subtitle>
          <Card.Text>{cart.image}</Card.Text>
          <Card.Link href="#">
            <Button
              onClick={() => addToCartHandler(cart._id)}
              className="btn btn-danger"
            >
              Add to Card
            </Button>
          </Card.Link>
          <Card.Link href="#">
            <Button
              onClick={() => viewProductHandler(cart._id)}
              className="btn btn-xs btn-info"
            >
              View
            </Button>
          </Card.Link>
        </Card.Body>
      </Col>
    );
  });
  return (
    <div>
      <Row>{cardList} </Row>
    </div>
  );
};

export default Cart;
