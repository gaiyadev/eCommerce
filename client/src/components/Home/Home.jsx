import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Cart from "../Shop/Product";
import Navbar from "../Navigation/Navbar";
import { useQuery } from "@apollo/client";
import { ALL_PRODUCT } from "../../apollos/queries/home";
const Home = () => {
  const { loading, error, data } = useQuery(ALL_PRODUCT);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <Navbar />
      <Container fluid="true">
        <Cart cart={data} />
      </Container>
    </div>
  );
};

export default Home;
