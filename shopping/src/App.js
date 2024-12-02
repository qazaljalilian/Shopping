import './App.css';
import ListView from './components/list-view';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';

import { ProductView } from './components/product-view';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import CheckOutView from './components/checkout-view';


function App() {
  const clicked = () => {
    window.location.href = '/cart';
  }
  return (

    <div className='App'>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" icon={<ShoppingCartOutlined />} onClick={clicked}>

        </Button>
      </div>{" "}
      <Router>
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/cart" element={<CheckOutView />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
