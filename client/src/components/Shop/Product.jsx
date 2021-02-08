import React from "react";
import { Card } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { ALL_PRODUCT } from "../../apollos/queries/home";
const Cart = () => {
  const { loading, error, data } = useQuery(ALL_PRODUCT);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const cardList = data.allProduct.map((cart) => {
    return (
      <Card.Body key={cart._id}>
        <Card.Title> {cart.name} </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{cart.price}</Card.Subtitle>
        <Card.Text>{cart.image}</Card.Text>
        <Card.Link href="#">Add to Card</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    );
  });
  return (
    <div>
      <Card>{cardList}</Card>
    </div>
  );
};

export default Cart;
