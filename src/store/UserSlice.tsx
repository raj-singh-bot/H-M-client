import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchAddress = createAsyncThunk('data/fetchAddress', async () =>{
    // console.log(slug)
    try {
        const response = await axios({
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/api/address/getAddress`,
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response.data)
        return response.data.userAddress;
    } catch (err) {
        console.error(err)
    }
})

export const addAddress = createAsyncThunk('data/addAddress', async (data:any) =>{
    console.log(data)
    try {
        const response = await axios({
            method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/api/address/create`,
            data: data,
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response.data)
        return response.data.address;
    } catch (err) {
        console.error(err)
    }
})

export const addOrder = createAsyncThunk('data/adOrder', async(data:any) => {
    console.log(data)
    try {
        const response = await axios({
            method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/order/user/addOrder`,
            data: data,
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.error(err)
    }
})

export const getOrders = createAsyncThunk('data/getOrders', async() => {
    try {
        const response = await axios({
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/order/user/getOrders`,
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response.data)
        return response.data.orders;
    } catch (err) {
        console.error(err)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState:{
        address: [],
        orders: [],
        orderDetails: {},
        error: '',
        loading: false,
        orderFetching: false,
        placedOrderId: ''
    },
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(fetchAddress.pending, (state, action) => {
            state.loading = true
        })
        .addCase(fetchAddress.fulfilled, (state, action) => {
            state.address = action.payload.address
            state.loading = false
        })
        .addCase(fetchAddress.rejected, (state, action:any) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(addAddress.pending, (state, action) => {
            state.loading = true
        })
        .addCase(addAddress.fulfilled, (state, action) => {
            state.address = action.payload.address
            state.loading = false
        })
        .addCase(addAddress.rejected, (state, action:any) => {
            state.error = action.payload.error
        })
        .addCase(addOrder.pending, (state, action) => {
            state.orderFetching = true
        })
        .addCase(addOrder.fulfilled, (state, action) => {
            state.placedOrderId = action.payload.order._id
        })
        .addCase(addOrder.rejected, (state, action:any) => {
            state.error = action.payload
        })
        .addCase(getOrders.pending, (state, action) => {
            state.orderFetching = true
        })
        .addCase(getOrders.fulfilled, (state, action) => {
            state.orders = action.payload
            state.orderFetching = false
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.orderFetching = false
        })
    }
})

export const getUser = (state:any) => state.user;
export default userSlice.reducer;