import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint"
import Home from "./pages/Home"

function App() {
  return (
    <Routes>

    <Route path="/" element={<Home/>}/>
    
    <Route path="/login" element={<Login/>}/>
    
    <Route path="/register" element={<Register/>}/>
    
    <Route path="/dashboard" element={<Dashboard/>}/>

    <Route path="/complaint" element={<Complaint/>}/>
    
    </Routes>
  );
}

export default App;