import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupCard from "../pages/SignupPage";
import LoginCard from "../pages/LoginPage";
import PrivateRoute from "../components/PrivateRoute";
import QuotePage from "../pages/QuotePage";
import Navbar from "../components/Navbar";

const AllRoutes = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<SignupCard/>} />
      <Route path="/login" element={<LoginCard/>} />
      <Route path="/quote" element={<PrivateRoute>
          <QuotePage/>
      </PrivateRoute>} />
    </Routes>
    </>
  );
};

export default AllRoutes;
