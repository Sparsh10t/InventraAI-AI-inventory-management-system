import React from "react";
import MainLayout from "./pages/MainLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AIInsights from "./pages/AIInsights";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import SalesInfo from "./pages/SalesInfo";



function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/sales-info" element={<SalesInfo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


