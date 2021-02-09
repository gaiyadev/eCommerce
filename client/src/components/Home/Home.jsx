import React from "react";
import { Button, Container } from "react-bootstrap";
import Cart from "../Shop/Product";
import Navbar from "../Navigation/Navbar";
import { useQuery } from "@apollo/client";
import { ALL_PRODUCT } from "../../apollos/queries/home";

const Home = () => {
  const { loading, error, data, refetch } = useQuery(ALL_PRODUCT);
  if (loading) return <h3 className="text-center text-info ">Loading...</h3>;
  if (error) return <p className="text-center text-danger ">Error :(</p>;
  return (
    <div>
      <Navbar />
      <Container fluid="true">
        <br />
        <Button className="btn btn-primary" onClick={() => refetch()}>
          {loading ? "Refetching" : "Refetch!"}
        </Button>
        <Cart products={data} />
      </Container>
    </div>
  );
};

export default Home;
