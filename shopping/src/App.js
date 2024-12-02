import './App.css';
import ListView from './components/list-view';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ProductView } from './components/product-view';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';


function App() {
  return (

    <div className='App'>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button type="primary" icon={<ShoppingCartOutlined />} >
            Shopping Cart
          </Button>
      </div>{" "}
      <Router>
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/product/:id" element={<ProductView />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
