import "./App.css";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import Login from "./Login";
import Dashboard from "./Dashboard";
import OrderDetail from "./Pages/OrderDetail";

function App() {
  return (
    <div className="App" role="main">
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="/order/:orderId" element={<OrderDetail />} />
      </Routes>
      
    </div>
  );
}

export default App;
