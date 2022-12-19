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
import Cart from './pages/Cart/Cart';
import { addToCart, getCartItem, updateCart } from './store/CartSlice';
import Checkout from './pages/Checkout/Checkout';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import Order from './pages/OrdersPage/Order';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state:any) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    let cartItems = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : [];
    console.log(cartItems)
    if(auth.authenticate == true){
      const payload = {
        cartItems: Object.keys(cartItems).map((key, index) => {
          return {
            quantity: cartItems[key].quantity,
            product: cartItems[key].product,
          };
        })
      }
      localStorage.removeItem('cart')
      console.log(payload)
      if(Object.keys(cartItems).length > 0){
        dispatch(addToCart(payload))
      }
    }
    dispatch(getCartItem())
  },[auth.authenticate])

  return (
    <>
    {/* <CategoryNavbar/> */}
        <Router>
    <Navbar/>
    <MenuHeader/>
          <Routes>
            <Route path='/'  element={<Home/>}/>
          </Routes>
          <Routes>
            <Route path='/products/' element={<ProductPage/>}/>
          </Routes>
          <Routes>
            <Route path='/products/productDetail' element={<ProductDetail/>}/>
          </Routes>
          <Routes>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
          <Routes>
            <Route path='/checkout' element={<Checkout/>}/>
          </Routes>
          <Routes>
            <Route path='/orders' element={<Order/>}/>
          </Routes>
          <Routes>
            <Route path='/order_details/:orderId' element={<OrderDetails/>}/>
          </Routes>
        </Router>
        <Footer/>
    </>
  );
}

export default App;
