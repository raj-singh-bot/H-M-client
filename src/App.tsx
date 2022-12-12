import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes,Route,} from 'react-router-dom';
import CategoryNavbar from './components/Navbar/CategoryNavbar';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/HomePage/Home';
import ProductPage from './pages/Product/ProductPage';
import Footer from './components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch, useSelector} from 'react-redux'
import  { AppDispatch } from './store/store';
import ProductDetail from './pages/productDetailPage/ProductDetail';
import MenuHeader from './components/Navbar/MenuCategory';
import { isUserLoggedIn } from './store/AuthSlice';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state:any) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  return (
    <>
    {/* <CategoryNavbar/> */}
    <Navbar/>
    <MenuHeader/>
        <Router>
          <Routes>
            <Route path='/'  element={<Home/>}/>
          </Routes>
          <Routes>
            <Route path='/products/' element={<ProductPage/>}/>
          </Routes>
          <Routes>
            <Route path='products/productDetail' element={<ProductDetail/>}/>
          </Routes>
        </Router>
        <Footer/>
    </>
  );
}

export default App;
