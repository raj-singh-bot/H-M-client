import React, { useEffect } from 'react'
import  Container  from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import { getCartItem, getCartItems } from '../../store/CartSlice';
import { AppDispatch } from '../../store/store';
import style from './cart.module.css'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const auth = useSelector((state:any) => state.auth);
    const dispatch = useDispatch<AppDispatch>()
    const {cartItems} = useSelector(getCartItems)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.authenticate == true) {
            dispatch(getCartItem());
          }
    }, [auth.authenticate])

    
    let totalPrice =0;
    Object.keys(cartItems).map((item:any ) => {
      totalPrice += cartItems[item].price * cartItems[item].qty
    })

    let deliveryPrice = totalPrice>1000 ? 0 : 150;
  return (
    <Container fluid="lg">
      <h1 className={style.heading} >Shoping Cart</h1>
      <div className={style.cartContainer}>
        <div className={style.cartLeft}>
          {/* {
            cartItems.length >1 ?
          <> */}
          {
            Object.keys(cartItems)?.map((key:any, index:any) => (
              <CartItem key={index} cartItem={cartItems[key]}/>
            ))
          // }
          // </>: <h3>Your Cart Is Empty</h3>
        }
        </div>
        <div className={style.cartRight}>
          <div>
            <p style={{fontSize: '13px', marginBottom: '10px'}}>Add a discount code</p>
            <div style={{display: 'flex', justifyContent: 'space-between' }}>
              <input type="text" className={style.formConrol}/>
              <button className={style.addBtn}>Add</button>
            </div>
            <div style={{fontSize: '13px', borderBottom: '1px solid #222', padding: '20px 0'}}>
              <p style={{display: 'flex', justifyContent: 'space-between' }}> <span>Order value</span>Rs.{totalPrice}</p>
              <p style={{display: 'flex', justifyContent: 'space-between' }}><span>Delivery</span><span>{totalPrice>1000? 'Free': deliveryPrice}</span></p>
            </div>
            <p style={{display: 'flex', justifyContent: 'space-between', paddingTop: '8px', paddingBottom: '20px' }}><p>Total</p><p>{totalPrice + deliveryPrice}</p></p>
            <button onClick={() => cartItems.length >1 ? navigate('/checkout') : ''} style={{background: '#222', color: '#fff', height: '48px', width: '100%'}}>Continue to checkout</button>
          </div>
        </div>
      </div>
    </Container>
    // <div className={style.cartSec}>
    //   cart
    // </div>
  )
}

export default Cart