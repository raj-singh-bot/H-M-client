import React, { useEffect, useState } from 'react'
import style from './cartItem.module.css'
import {RiDeleteBin6Line} from 'react-icons/ri'
import Select from 'react-select'
import {get} from 'lodash'
import { getAuth } from '../../store/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeCartItem } from '../../store/CartSlice'
import { AppDispatch } from '../../store/store'
// interface Iprops{

// }
const options:any[] = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },

  ];
const CartItem = (props:any) => {
    const [current, setCurrent] = useState<any>(props.cartItem.qty)
    const auth = useSelector(getAuth);
    const dispatch = useDispatch<AppDispatch>()
    
    useEffect(() => {
        console.log(current.value)
    }, [current])


    const handleChange = (e:any) => {
        setCurrent(e)
        // console.log(e.value)
        // setTimeout(() => {
        // console.log(current.value)
            if(auth.authenticate === true){
                const payload ={
                    cartItems: 
                        {
                        product: props.cartItem._id,
                        quantity: e.value,
                        },
                }
                console.log(payload)
                dispatch(addToCart(payload))
            }
        // },2000)
        // }else{
        //     localStorage.setItem("cart", JSON.stringify(cartItems));
        // }
    }
    const handleDelete = () => {
        dispatch(removeCartItem({productId: props.cartItem._id}))
    }
   
  return (
    <div className={style.singleItem}>
        <div className={style.itemLeft}>
            <img src={props.cartItem.img} alt="product" />
        </div>
        <div className={style.itemRight}>
            <p>{props.cartItem.name}</p>
            <span>Rs.{props.cartItem.price}</span>
            <div style={{display: 'flex', margin: '24px 0'}}>
                <p style={{marginRight: '25px'}}>Size:</p>
                <p>Total: Rs.{props.cartItem.price * props.cartItem.qty}</p>
            </div>
            <div style={{width: '80px'}}>
                <Select 
                    value={options.find((op:any) => op.value == current)} 
                    // value={value=''}
                    options={options} 
                    onChange={handleChange} 
                    name='options'
                />
            </div>
            <button onClick={handleDelete} style={{position: 'absolute', right: '0', top: '0'}}><RiDeleteBin6Line fontSize={24}/></button>
        </div>
    </div>
  )
}

export default CartItem