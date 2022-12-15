import React, { useEffect } from 'react'
import  Container  from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem';
import { getCartItem, getCartItems } from '../../store/CartSlice';
import { AppDispatch } from '../../store/store';
import style from './cart.module.css'

const Cart = () => {
    const auth = useSelector((state:any) => state.auth);
    const dispatch = useDispatch<AppDispatch>()
    const {cartItems} = useSelector(getCartItems)

    useEffect(() => {
        if (auth.authenticate == true) {
            dispatch(getCartItem());
          }
    }, [auth.authenticate])
    console.log(cartItems)
    
  return (
    <Container fluid="lg">
      <h1 className={style.heading} >Shoping Cart</h1>
      <div className={style.cartContainer}>
        <div className={style.cartLeft}>
          {
            Object.keys(cartItems)?.map((key:any, index:any) => (
              <CartItem key={index} cartItem={cartItems[key]}/>
            ))
          }
        </div>
        <div className={style.cartRight}>
          <p>checkout</p>
        </div>
      </div>
    </Container>
    // <div className={style.cartSec}>
    //   cart
    // </div>
  )
}

export default Cart