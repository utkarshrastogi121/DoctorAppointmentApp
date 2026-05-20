// import React from 'react'
import Home from '../pages/Home'
import Services from '../pages/Services'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import AboutUs from '../pages/AboutUs'
import DoctorDetails from '../pages/Doctors/DoctorDetails'
import Doctors from '../pages/Doctors/Doctors'
import MyAccount from '../Dashboard/user-account/MyAccount'
import Dashboard from '../Dashboard/doctor-account/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import CheckoutSuccess from '../pages/CheckoutSuccess'


import {Routes, Route} from 'react-router-dom'

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const Routers = () => {
  return (
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/doctors" element={<Doctors></Doctors>}></Route>
          <Route path="/doctors/:id" element={<DoctorDetails></DoctorDetails>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Signup></Signup>}></Route>
          <Route path="/about-us" element={<AboutUs></AboutUs>}></Route>
          <Route path="/services" element={<Services></Services>}></Route>
          <Route path="/checkout-success" element={<CheckoutSuccess></CheckoutSuccess>}></Route>
          <Route path="/users/profile/me" element={<ProtectedRoute allowedRoles={["patient"]}><MyAccount /></ProtectedRoute>}></Route>
          <Route path="/doctors/profile/me" element={<ProtectedRoute allowedRoles={["doctor"]}><Dashboard/></ProtectedRoute>}></Route>
        </Routes>
      </ErrorBoundary>
  );
}

export default Routers


