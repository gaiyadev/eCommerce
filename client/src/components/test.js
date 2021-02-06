import React from "react";
import { useQuery, gql } from "@apollo/client";

const EXCHANGE_RATES = gql`
  query Products {
    allProduct {
      _id
      price
      sku
      name
      addedBy
      color
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allProduct.map(({ _id, price, sku, name, color, addedBy }) => (
    <div key={_id}>
      <p>Price: {price}</p>
      <p>Name: {name}</p>
      <p>color: {color}</p>
      <p>addedBy: {addedBy}</p>
      <p>sku: {sku}</p>
      <p>_id: {_id}</p>
    </div>
  ));
}

export default ExchangeRates;
