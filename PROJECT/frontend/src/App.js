import "bulma/css/bulma.min.css";

import {BrowserRouter, Routes, Route}from 'react-router-dom';


import 'react-toastify/dist/ReactToastify.css'

import Navigation from "./components/Online-shopping-components/Navigation";
import ThemeProvider from './components/Online-shopping-components/theme';
import Onlineshop_routes from "./routes/Onlineshop_routes";
import Footer from "./components/Online-shopping-components/Footer";

import ScrollToTop from './components/Online-shopping-components/components/scroll-to-top';
import Router from './components/Online-shopping-components/routes'
import { useContext } from "react";
import { Store } from "./components/Online-shopping-components/Store";
import Home from "./pages/Home";
import Canvas from './canvas'
import Customizer from './pages/Customizer'
import HomeLayout from "./HomeLayout";

function App() {
  //header
  const { state, dispatch: ctxDispatch } = useContext(Store);
   

 
return(
    <BrowserRouter>
  
      
  <Routes >
       
        
       <Route path = "/homeee" element = {<HomeLayout/>}/>
  
      </Routes>
     
   <Navigation/>
   <Router/>
  





 
  
   
    


   </BrowserRouter>
  
  
)

}

export default App;
