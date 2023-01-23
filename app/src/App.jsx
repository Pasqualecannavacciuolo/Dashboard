import "./App.css";

import { Route, Routes } from "react-router-dom";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import OrderDetail from "../src/pages/OrderDetail/OrderDetail";
import HomeDashboard from "./pages/Dashboard/HomeDashboard";
import ScrollToTop from "./utils/ScrollToTop";


function App() {
  return (
    <div className="App" role="main">
      <ScrollToTop>
      <Routes>
          <Route path='/' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='dashboard/*' element={<Dashboard />} >
              <Route index element={<HomeDashboard />} />
              <Route path="order/:orderId" element={<OrderDetail />} />
          </Route>
      </Routes>
      </ScrollToTop>
    </div>
  );
}

export default App;
