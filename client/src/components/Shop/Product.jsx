import React from "react";
import { Card, Row, Button, Col } from "react-bootstrap";

const Cart = ({ cart }) => {
  const addToCartHandler = (id) => {
    alert(id);
  };

  const viewProductHandler = (id) => {
    alert(id);
  };

  const cardList = cart.allProduct.map(({ name, image, price, _id }) => {
    return (
      <Col md={3}>
        <Card.Body style={{ background: "#fff", margin: "5px" }} key={cart._id}>
          <Card.Title> {name} </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
          <Card.Text>{image}</Card.Text>
          <Card.Link>
            <Button
              onClick={() => addToCartHandler(_id)}
              className="btn btn-danger"
            >
              Add to Card
            </Button>
          </Card.Link>
          <Card.Link>
            <Button
              onClick={() => viewProductHandler(_id)}
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
      <h3 className="text-center text-primary">All Product</h3>
      <Row>{cardList} </Row>
    </div>
  );
};

export default Cart;
