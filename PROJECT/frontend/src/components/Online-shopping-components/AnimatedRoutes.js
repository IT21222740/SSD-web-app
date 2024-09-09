import React from "react";
import { useLocation, Routes, Route, useRoutes } from "react-router-dom";
import OrderList from "../../pages/Shop_pages/OrderList";
import CartScreen from "../../pages/Shop_pages/CartScreen";
import Category from "./Category";
import CoachScreen from "../../pages/Shop_pages/CoachScreen";
import CreateProduct from "../../pages/Shop_pages/CreateProduct";
import Home from "../../pages/Shop_pages/Home";
import Product from "../../pages/Shop_pages/Product";
import ProductListScreen from "../../pages/Shop_pages/ProductListScreen";
import AdminDashBoard from "../../pages/Shop_pages/AdminDashBoard";
import ProtectedRoutes from "./ProtectedRoutes";
import Search from "./Search";
import SearchScreen from "../../pages/Shop_pages/AdminDashBoard";
import SigninScreen from "../../pages/Shop_pages/SigninScreen";
import UpdateProduct from "../../pages/Shop_pages/UpdateProduct";
import { AnimatePresence } from "framer-motion";
import AddCoach from "./AddCoach";
import Signout from "./Signout";
import Shipping from "./Shipping";
import Homes from "../../pages/homepage/Home";
import Inventory_home from "../../pages/inventory_mgt/Inventory_home";
import PaymentMethodScreen from "../../pages/Shop_pages/PaymentMethodScreen";
import PlaceOrderScreen from "../../pages/Shop_pages/PlaceOrderScreen";


import Clothings from "../../pages/clothings_pages/Clothings";
import ChatBot from "../../pages/chatBot/ChatBot";




import ProcessPayment from "../../pages/Payment_pages/PaymentProcess";
import ProductList from "../../pages/Shop_pages/ProductList";


//Customer pages
import Customer_home from "../../pages/customer_pages/Customer_home";

//import animatePresence

//import customer components
import Customer_Login from "../../components/customer-components/Customer_Login";
import Customer_Password from "../../components/customer-components/Customer_Password";
import Customer_Profile from "../../components/customer-components/Customer_Profile";
import Customer_Recovery from "../../components/customer-components/Customer_Recovery";
import Customer_Register from "../../components/customer-components/Customer_Register";
import Customer_Reset from "../../components/customer-components/Customer_Reset";
import Customer_Dashboard from "../../components/customer-components/Customer_Dashboard";
import PageNotFound from "../../components/customer-components/PageNotFound";
// layouts
import DashboardLayout from "../../components/Online-shopping-components/layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import ExpenseDashboard from "../Online-shopping-components/pages/ExpenseDashboard";
// auth middleware
import {
  AuthorizeUser,
  ProtectRoute,
} from "../../components/customer-components/customerAuth";
import DashboardAppPage from "./pages/DashboardAppPage";
import Review from "../../pages/Payment_pages/Review";
import OrderScreen from "../../pages/Shop_pages/OrderScreen";
import Canvas from '../../canvas'
import Customizer from "../../pages/Customizer";
import Homee from "../../pages/Home";
import OrderHistoryScreen from "../../pages/Shop_pages/OrderHistoryScreen";
import Webcam from "../../pages/Shop_pages/webcamfeed";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/shophome" element={<Home />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/orderList" element={<OrderHistoryScreen />} />
        <Route path="/payment" element={<PaymentMethodScreen />}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen />} />

        <Route path="/clothings" element={<Clothings />} />
        <Route path="/ChatBot" element={<ChatBot />} />
        {/* <Route path="/order/:id" element={<OrderScreen />}></Route> */}

        <Route path="/webcam" element={<Webcam />}></Route>
        <Route path="/order/:id" element={<OrderScreen />}></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminDashBoard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/productList"
          element={
            <ProtectedRoutes>
              <ProductList />
            </ProtectedRoutes>
          }
        />
         <Route path="/inventory_home" element={<Inventory_home />} />
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
        <Route path="/shipping" element={<Shipping />} />
 
     
     
 
        <Route path="/payment_" element={<ProcessPayment />} />
        <Route path="/reviewss" element={<Review />} />
        <Route path="/paymenttt" element={<ExpenseDashboard />} />
       
        <Route exact path="/paymentt" element={<ExpenseDashboard />}></Route>
      
        harini
        {/* Customer pages routes */}
        {/* Customer pages routes */}
        <Route path="/customer_home" element={<Customer_home />} />,
        {/* new routes */}
        <Route path="/Customer_Register" element={<Customer_Register />} />
        ,
        <Route path="/Customer_Dashboard" element={<Customer_Dashboard />} />
        ,
        <Route path="/Customer_Login" element={<Customer_Login />} />,
        <Route path="/Customer_Password" element={<Customer_Password />} />
        ,
        <Route
          path="/Customer_Profile"
          element={
            <AuthorizeUser>
              <Customer_Profile />
            </AuthorizeUser>
          }
        />
        ,
        <Route path="/Customer_Recovery" element={<Customer_Recovery />} />
        ,
        <Route path="/Customer_Reset" element={<Customer_Reset />} />
        ,
        <Route path="*" element={<PageNotFound />} />
        {/* Customer admin pages routes */}
        <Route path="/cusAdminHeader" element={<cusAdminHeader />} />
        ,
        <Route path="/cusAdminHome" element={<cusAdminHome />} />,
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
