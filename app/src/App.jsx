import "./App.css";

import { Route, Routes, createBrowserRouter } from "react-router-dom";

import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import OrderDetail from "./Pages/OrderDetail/OrderDetail";
import HomeDashboard from "./Pages/Dashboard/HomeDashboard";
import ScrollToTop from "./utils/ScrollToTop";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";


function App() {

  return (
    <div className="App" role="main">
      <ScrollToTop>
      <Routes>
          <Route path='/' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='dashboard/' element={<Dashboard />}>
              <Route index element={<HomeDashboard />} />
              <Route path="order/:orderId" element={<OrderDetail />} />
              <Route path="product/:productId" element={<ProductDetail />} />
          </Route>
      </Routes>
      </ScrollToTop>
    </div>
  );
}

export default App;
