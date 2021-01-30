import React from "react";
import BreaCrum from "../Header/BreadCrum";
import { Container, Row, Col } from "react-bootstrap";
import { useTable } from "react-table";

const Dashboard = () => {
  const data = React.useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
        col3: "dfdfdfd",
        col4: "vdfdfdfd",
        col5: "vfdfdf",
      },
      {
        col1: "react-table",
        col2: "rocks",
        col3: "dfdfdfd",
        col4: "vdfdfdfd",
        col5: "vfdfdf",
      },
      {
        col1: "whatever",
        col2: "you want",
        col3: "dfdfdfd",
        col4: "vdfdfdfd",
        col5: "vfdfdf",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Price",
        accessor: "col2",
      },
      {
        Header: "SKU",
        accessor: "col3",
      },
      {
        Header: "Image",
        accessor: "col4",
      },
      {
        Header: "Color",
        accessor: "col5",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  return (
    <div>
      <BreaCrum></BreaCrum>
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <h1>All Product</h1>
            <table
              {...getTableProps()}
              style={{ border: "solid 1px blue", width: "100%" }}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        style={{
                          borderBottom: "solid 3px red",
                          background: "aliceblue",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: "10px",
                              border: "solid 1px gray",
                              background: "papayawhip",
                            }}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
