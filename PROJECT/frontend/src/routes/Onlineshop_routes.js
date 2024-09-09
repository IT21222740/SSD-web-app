import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import CartScreen from "../pages/Shop_pages/CartScreen";
import Category from "../components/Online-shopping-components/Category";
import CoachScreen from "../pages/Shop_pages/CoachScreen";
import CreateProduct from "../pages/Shop_pages/CreateProduct";
import Home from "../pages/Shop_pages/Home";
import Product from "../pages/Shop_pages/Product";
import ProductListScreen from "../pages/Shop_pages/ProductListScreen";
import AdminDashBoard from "../pages/Shop_pages/AdminDashBoard";
import ProtectedRoutes from "../components/Online-shopping-components/ProtectedRoutes";
import Search from "../components/Online-shopping-components/Search";
import SearchScreen from "../pages/Shop_pages/AdminDashBoard";
import SigninScreen from "../pages/Shop_pages/SigninScreen";
import UpdateProduct from "../pages/Shop_pages/UpdateProduct";
import { AnimatePresence } from "framer-motion";
import AddCoach from "../components/Online-shopping-components/AddCoach";
import Signout from "../components/Online-shopping-components/Signout";
import Shipping from "../components/Online-shopping-components/Shipping";
import Homes from "../pages/homepage/Home";

import Homee from "../pages/Home";

export default function Onlineshop_routes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/shophome" element={<Home />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminDashBoard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/coach"
          element={
            <ProtectedRoutes>
              <CoachScreen />
            </ProtectedRoutes>
          }
        />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/addCoach" element={<AddCoach />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/Category/:category" element={<Category />} />
        <Route path="/signup" element={<Signout />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="/" element={<Homes />} />
        
       <Route path = "/homeee" element = {<Homee/>}/>
  
      </Routes>
    </AnimatePresence>
  );
}
