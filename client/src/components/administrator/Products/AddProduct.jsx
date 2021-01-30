import React from "react";
import BreadCrum from "../Header/BreadCrum";
import { Container, Form, Button } from "react-bootstrap";

const AddProduct = () => {
  return (
    <Container>
      <BreadCrum />
      <h1 className="text-center">ADD PRODUCT</h1> <br />
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            size="lg"
            name="product_name"
            placeholder="Enter Product name"
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            id="price"
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

export default AddProduct;
