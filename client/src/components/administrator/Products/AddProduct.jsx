import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import BreadCrum from "../Header/BreadCrum";
import { Container, Form, Button } from "react-bootstrap";
import { ADD_PRODUCT } from "../../../apollos/mutations/product";
import Notiflix from "notiflix";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [addProduct] = useMutation(ADD_PRODUCT);

  const addProductHandler = (event) => {
    event.preventDefault();
    addProduct({
      variables: {
        name: name,
        price: price,
        image: image,
        sku: sku,
        color: color,
      },
    })
      .then((res) => {
        setLoading(false);
        const alert = res.data.addProduct.message;
        setMessage(alert);
        Notiflix.Notify.Success(`${message}`);
      })
      .catch((err) => {
        setLoading(false);
        const error = err.networkError.result.errors[0].message;
        setErrMsg(error);
        Notiflix.Notify.Failure(`${errMsg}`);
      });
  };

  return (
    <Container>
      <BreadCrum />
      <h1 className="text-center">ADD PRODUCT</h1> <br />
      <Form onSubmit={addProductHandler}>
        <Form.Group controlId="name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            onChange={(event) => {
              const name = event.target.value;
              setName(name);
            }}
            size="lg"
            name="product_name"
            placeholder="Enter Product name"
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            onChange={(event) => {
              const price = event.target.value;
              setPrice(price);
            }}
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
            onChange={(event) => {
              const sku = event.target.value;
              setSku(sku);
            }}
            type="text"
            size="lg"
            placeholder="SKu Number"
          />
        </Form.Group>

        <Form.Group controlId="color">
          <Form.Label>Color</Form.Label>
          <Form.Control
            name="price"
            onChange={(event) => {
              const color = event.target.value;
              setColor(color);
            }}
            id="color"
            size="lg"
            type="text"
            placeholder="Color"
          />
        </Form.Group>

        <Form.Group>
          <Form.File
            onChange={(event) => {
              const image = event.target.value;
              setImage(image);
            }}
            id="image"
            label="Product Image"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
