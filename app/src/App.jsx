import "./App.css";

import { Route, Routes } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import OrderDetail from "./pages/OrderDetail";
import HomeDashboard from "./pages/HomeDashboard";
import ScrollToTop from "./ScrollToTop";


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
