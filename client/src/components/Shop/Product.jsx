import React, { useState } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import Notiflix from "notiflix";

const Cart = ({ products }) => {
  const [cartItems, setCartItems] = useState([]);
  const [add, setAdd] = useState(false);

  const addToCartHandler =  (product) => {
    setAdd(true);
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setAdd(true);
      setCartItems(
         cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
      setAdd(false);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      Notiflix.Notify.Success("Added to cart successfully");
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setAdd(false);
      Notiflix.Notify.Success("Added to cart successfully");
    }
  };

  const onRemoveHandler = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const viewProductHandler = (id) => {
    alert(id);
  };

  const cardList = products.allProduct.map((product) => {
    return (
      <Col md={3}>
        <Card.Body
          style={{ background: "#fff", margin: "5px" }}
          key={product._id}
        >
          <Card.Title> {product.name} </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {product.price}
          </Card.Subtitle>
          <Card.Text>{product.image}</Card.Text>
          <Card.Link>
            <Button
              onClick={() => addToCartHandler(product)}
              className="btn btn-danger"
            >
              {add ? "Adding" : " Add to Card"}
            </Button>
          </Card.Link>
          <Card.Link>
            <Button
              onClick={() => viewProductHandler(product._id)}
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
