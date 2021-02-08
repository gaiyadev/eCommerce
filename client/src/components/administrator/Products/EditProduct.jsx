import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import BreadCrum from "../Header/BreadCrum";
import { Container, Form, Button } from "react-bootstrap";
import { GET_PRODUCT_BY_ID } from "../../../apollos/queries/product";

const EditProduct = () => {
  let Id = useParams().id.toString();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [color, setColor] = useState("");
  // const [image, setImage] = useState("");

  const { error, data, loading } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId: Id },
    // pollInterval: 454545454500,
  });
  if (error) return <p>ERROR</p>;
  if (loading) return <p>Loading</p>;

  if (data) {
    console.log(data);
    setName(data.getProductById[0].name);
    setPrice(data.getProductById[0].price);
    setColor(data.getProductById[0].color);
    setSku(data.getProductById[0].sku);
  }
  return (
    <Container>
      <BreadCrum />
      <h1 className="text-center">EDIT PRODUCT</h1> <br />
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            size="lg"
            value={name}
            name="product_name"
            placeholder="Enter Product name"
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            id="price"
            value={price}
            size="lg"
            type="text"
            placeholder="Price"
          />
        </Form.Group>

        <Form.Group controlId="sku">
          <Form.Label>SKU</Form.Label>
          <Form.Control
            name="sku"
            id="sku"
            type="text"
            value={sku}
            size="lg"
            placeholder="SKu Number"
          />
        </Form.Group>

        <Form.Group controlId="color">
          <Form.Label>Color</Form.Label>
          <Form.Control
            name="price"
            id="color"
            size="lg"
            value={color}
            type="text"
            placeholder="Color"
          />
        </Form.Group>

        <Form.Group>
          <Form.File id="image" label="Product Image" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
