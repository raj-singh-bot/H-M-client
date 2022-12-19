import {createAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event';
import { rejects } from 'assert';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getAuth } from './AuthSlice';
import store from './store';

interface IProduct{
    _id: string,
}

export const getCartItem = createAsyncThunk('cart/getCartItem', async() => {
    try {
        const response = await axios({
            method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/cart/user/getCartItems`,
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        // console.log(response.data)
        return response.data;
    } catch (err:any) {
        console.error(err)
        // return err.response.data.msg
    }
})

export const addToCart = createAsyncThunk('cart/addToCart', async (product:any, thunkAPI) =>{

    console.log(product)
        try {
            const response = await axios({
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/cart/user/addToCart`,
                data: product,
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data)
            thunkAPI.dispatch(getCartItem())
            return response.data;
        } catch (err) {
            console.error(err)
        }
})

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (payload:any,thunkAPI) =>{
    console.log(payload)
    try {
        const response = await axios({
            method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/cart/user/removeItem`,
            data: payload,
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response.data)
        thunkAPI.dispatch(getCartItem())
        return response.data;
    } catch (err) {
        console.error(err)
    }
})

export const updateCart = (payload:any) => {

    console.log(payload)
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: {},
        updatingCart: false,
        error: '',
        status: 'idle'
    },

    reducers: {
        addCart: (state:any,action) =>{
            console.log(action.payload.payload)
            // console.log(state.cartItems.product)
            const itemInCart = state.cartItems.product == action.payload.payload.cartItems.product;
            console.log(itemInCart)
            if (itemInCart) {
                console.log('aaa')
                state.cartItems = action.payload.payload.cartItems.quantity++
            } else {
                state.cartItems = action.payload.payload
            }
        }
    },
    extraReducers(builder){
        builder.addCase(addToCart.pending, (state, action) => {
            state.updatingCart = true
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            console.log(state.cartItems)
            console.log(action.payload)
            state.cartItems = Object.assign(state.cartItems, action.payload.cart)
            state.updatingCart = false
        })
        .addCase(addToCart.rejected, (state, action) => {
            // console
            state.updatingCart = false
        })
        .addCase(getCartItem.pending, (state, action:any) => {
            // console.log(action)
            state.status = 'loading'
            state.error = action.payload
        })
        .addCase(getCartItem.fulfilled, (state,action) => {
            state.cartItems = action.payload.cartItems
            state.status = 'success'
        })
        .addCase(getCartItem.rejected, (state, action:any) => {
            state.status = 'rejected'
            state.error = action.payload.msg
        })
        .addCase(removeCartItem.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(removeCartItem.fulfilled, (state, action) => {
            // state.cartItems = action.payload
            state.status = 'success'
        })
        .addCase(removeCartItem.rejected, (state, action) => {
            state.status = 'rejected'
        })
    }
})

export const getCartItems = (state:any) => state.cart;
export default cartSlice.reducer;
export const {addCart}  = cartSlice.actions

// export {getCartItems}