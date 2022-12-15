import React, { useEffect, useState } from 'react'
import style from './productDetail.module.css'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct, getProductDetail, getStatus } from '../../store/ProductSlice';
import { AppDispatch } from '../../store/store';
import { useBeforeunload } from 'react-beforeunload';
import { addToCart, getCartItems } from '../../store/CartSlice';
import { getAuth } from '../../store/AuthSlice';



const ProductDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector(getStatus);
    const products = useSelector(getProductDetail);
    const [startTime, setStart] = useState<any>();
    const auth = useSelector(getAuth);
    const {cartItems} = useSelector(getCartItems)

    useEffect(() => {
        let code = searchParams.get('code');
        if(code !== null){
            dispatch(fetchSingleProduct(code))
        }
    },[])

    console.log(cartItems)
    
    const handleClick = () => {
        console.log(cartItems)
        console.log(auth)
        const qty = cartItems[products._id] ? parseInt(cartItems[products._id].quantity + 1) : 1;
        console.log(qty)
        // cartItems[products._id] = {
        //     ...products,
        //     qty
        // }
        if(auth.authenticate == true){
            const payload ={
                cartItems: 
                    {
                    product: products._id,
                    quantity: qty,
                    },
                
            }
            console.log(payload)
            dispatch(addToCart(payload))
        }else{
            if(localStorage.getItem('cart')){
                let cart = JSON.parse(localStorage.getItem('cart')!)
                console.log(cart)
                if(cart.cartItems.product == products._id){
                    localStorage.setItem("cart", JSON.stringify({cartItems: 
                        {
                        product: products._id,
                        quantity: cart.cartItems.quantity + 1,
                        },}));
                }
                // console.log(product)
                // localStorage.setItem('cart', JSON.stringify(product))
                
            }else{
                localStorage.setItem("cart", JSON.stringify({cartItems: 
                    {
                    product: products._id,
                    quantity: qty,
                    },}));
            }
        }
        // console.log("addToCart:", cartItems);
    }
    
  return (
        <div className={style.mainSec}>
            <div className={style.productOverview}>
                {
                    products.productImages?.map((i:any) => {
                        return (
                            <img  src={i.img} alt={i._id} key={i._id}/>
                        )
                    })
                }
            </div>
            <div className={style.productDesc}>
                <h6 className={style.heading}>{products.name}</h6>
                <p className={style.price}> {`Rs.${products.price}`}</p>
                <button onClick={handleClick} className={style.cmnBtn}><img src='/cart.svg' alt='logo' style={{marginRight: '5px'}}/>Add</button>
            </div>
        </div>
  )
}

export default ProductDetail