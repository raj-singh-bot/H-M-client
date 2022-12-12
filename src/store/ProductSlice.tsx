    import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

    export const fetchProducts = createAsyncThunk('data/fetchProduct', async (slug:any) =>{
        console.log(slug)
        return fetch(`${process.env.REACT_APP_BASE_URL}/product/products/${slug}`).then((res) => res.json())
    })

    export const fetchSingleProduct = createAsyncThunk('data/fetchSingleProduct', async (slug:any) =>{
        console.log(slug)
        return fetch(`${process.env.REACT_APP_BASE_URL}/product/product/${slug}`).then((res) => res.json())
    })
    // interface Iprops {
    //     data: [],
    //     status: 'idle' | 'success' | 'loading' | 'rejected'
    // }

    export const STATUSES = Object.freeze({
        IDLE: 'idle',
        ERROR: 'error',
        LOADING: 'loading',
    });
    

    const productSlice = createSlice({
        name: 'product',
        initialState: {
            data: [],
            status: 'idle',
            product: {}
        },

        reducers: {
            // setProducts(state, action) {
            //         state.data = action.payload;
            // },

            
        },
        extraReducers(builder){
            builder.addCase(fetchProducts.pending, (state,action) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state,action) => {
                state.status = 'success'
                state.data = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'rejected'
            })
            .addCase(fetchSingleProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.status = 'success'
                state.product = action.payload.product
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.status = 'rejected'
            })
        }
    })
 
// export const { setProducts } = productSlice.actions;

export const getStatus = (state:any) => state.product.status
export const getProducts = (state:any) => state.product.data
export const getProductDetail = (state:any) => state.product.product
export default productSlice.reducer;