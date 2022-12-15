import {createAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
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
        return response.data;
    } catch (err) {
        console.error(err)
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

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: {},
        updatingCart: false,
        error: '',
        status: 'idle'
    },

    reducers: {
        // addToCart(){

        // }
    },
    extraReducers(builder){
        builder.addCase(addToCart.pending, (state, action) => {
            state.updatingCart = true
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            // state.cartItems = action.payload.cartItems
            state.updatingCart = false
        })
        .addCase(addToCart.rejected, (state, action) => {
            // console
            state.updatingCart = false
        })
        .addCase(getCartItem.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getCartItem.fulfilled, (state,action) => {
            state.cartItems = action.payload.cartItems
            state.status = 'success'
        })
        .addCase(getCartItem.rejected, (state, action) => {
            state.status = 'rejected'
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


// export {getCartItems}