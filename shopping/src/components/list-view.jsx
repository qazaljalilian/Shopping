import React from "react";
import { Card, Col, Row } from "antd";
import useFetchProducts from "../services/use-fetch-products";
import { Link } from "react-router-dom";

const style = { background: "#0092ff", padding: "8px 0" };

const ListView = () => {
  const cols = [];
  const { products, loading } = useFetchProducts();
  console.log(products, loading);

  if (products.length) {
    for (let i = 0; i < products.length; i++) {
      cols.push(
        <Col key={i} className="gutter-row" span={24}>
          <Card style={{textAlign: 'left',width: '100%'}} title={products[i].name} bordered={false}>
            <div style={{display: 'flex', justifyContent:'space-between'}}>            <span>Price.: {products[i].price}</span>
            <Link to={`/product/${products[i].id}`}>View Details</Link></div>


          </Card>
        </Col>
      );
    }
  }

  return (
    <>

      <Row gutter={[16, 24]}>{cols}</Row>
    </>
  );
};

export default ListView;
