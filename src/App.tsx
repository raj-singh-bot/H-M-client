import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes,Route,} from 'react-router-dom';
import CategoryNavbar from './components/Navbar/CategoryNavbar';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/HomePage/Home';
import ProductPage from './pages/Product/ProductPage';
import Footer from './components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import store from './store/store';

function App() {
  return (
    <>
    {/* <Navbar/> */}
    {/* <CategoryNavbar/> */}
    <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/'  element={<Home/>}/>
          </Routes>
          <Routes>
            <Route path='/products' element={<ProductPage/>}/>
          </Routes>
        </Router>
        <Footer/>
    </Provider>
    </>
  );
}

export default App;
