import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import BreaCrum from "../Header/BreadCrum";
import { Container, Table, Row, Col } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { ADMIN_PRODUCTS } from "../../../apollos/queries/product";
import { DELETE_PRODUCT } from "../../../apollos/mutations/product";
import { useHistory } from "react-router-dom";
import Notiflix from "notiflix";

const Dashboard = () => {
  const [Loading, setLoading] = useState(false);
  // const [errMsg, setErrMsg] = useState("");
  const [message, setMessage] = useState("");
  const [id, setid] = useState("initialState");
  let history = useHistory();

  useEffect(() => {
    productFetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productFetch = () => {
    const adminData = JSON.parse(localStorage.getItem("admin"));
    const _id = adminData["_id"];
    setid(_id);
  };

  // DELETE PRODUCT
  const [deleteProductById] = useMutation(DELETE_PRODUCT);
  const deleteHandler = (id) => {
    setLoading(true);
    deleteProductById({
      variables: {
        productId: id,
      },
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setMessage(res.data.deleteProductById.message);
        Notiflix.Notify.Success(`${message}`);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        // const error = err.networkError.result.errors[0].message;
        // setErrMsg(error);
        // Notiflix.Notify.Failure(`${errMsg}`);
      });
  };

  const updateHandler = (id) => {
    history.push(`/home/edit/${id}`);
  };

  const viewHandler = (id) => {
    console.log("viewHandler??", id);
  };

  const { error, data, loading } = useQuery(ADMIN_PRODUCTS, {
    variables: { adminId: id },
  });

  if (loading)
    return (
      <p
        style={{
          textAlign: "center",
          color: "blue",
          fontSize: "20px",
          width: "400px",
          height: "400px",
          margin: "auto",
        }}
      >
        Loading...
      </p>
    );
  if (error)
    return (
      <p style={{ textAlign: "center", color: "red", fontSize: "20px" }}>
        Error :(
      </p>
    );

  const products = data.adminProduct.map(
    ({ _id, price, sku, name, image, color }) => {
      return (
        <tr key={_id}>
          <td>1</td>
          <td>{name} </td>
          <td> {price} </td>
          <td> {sku} </td>
          <td> {color} </td>
          <td> {image} </td>
          <th>
            <button
              onClick={() => viewHandler(_id)}
              className="btn btn-info"
              type="button"
            >
              View
            </button>
          </th>
          <th>
            <button
              onClick={() => deleteHandler(_id)}
              className="btn btn-danger"
              type="button"
            >
              {Loading ? "Deleting" : "Del"}
            </button>
          </th>
          <th>
            <button
              onClick={() => updateHandler(_id)}
              type="button"
              className="btn btn-primary"
            >
              update
            </button>
          </th>
        </tr>
      );
    }
  );

  return (
    <div>
      <BreaCrum></BreaCrum>
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <h1>All Product</h1>
            <Table striped bordered hover size="lg" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th> SN </th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>SKU</th>
                  <th>Color</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>{products}</tbody>
            </Table>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
