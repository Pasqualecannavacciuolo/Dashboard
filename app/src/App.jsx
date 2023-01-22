import "./App.css";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
//import logo from "./logo.svg";
import Login from "./Login";
import Dashboard from "./Dashboard";
import OrderDetail from "./pages/OrderDetail";
import HomeDashboard from "./pages/HomeDashboard";

function App() {
  return (
    <div className="App" role="main">
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard/*' element={<Dashboard />} >
            <Route index element={<HomeDashboard />} />
            <Route path="order/:orderId" element={<OrderDetail />} />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
