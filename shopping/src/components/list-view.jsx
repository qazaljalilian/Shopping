import React from "react";
import { Card, Col, Row } from "antd";
import useFetchProducts from "../services/use-fetch-products";

const style = { background: "#0092ff", padding: "8px 0" };

const ListView = () => {
  const cols = [];
  const { products, loading, error } = useFetchProducts();
  console.log(products, loading);

  if (products.length) {
    for (let i = 0; i < products.length; i++) {
      cols.push(
        <Col key={i} className="gutter-row" span={6}>
          <Card title={products[i].name} bordered={false}>
            {products[i].brand}
          </Card>
        </Col>
      );
    }
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Products List</h1>
        <h2>no</h2>
      </div>{" "}
      <Row gutter={[16, 24]}>{cols}</Row>
    </>
  );
};

export default ListView;
