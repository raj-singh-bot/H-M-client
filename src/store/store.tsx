import {configureStore} from '@reduxjs/toolkit'
import productSlice from './ProductSlice'
import AuthSlice from './AuthSlice'
import CartSlice from './CartSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        product: productSlice,
        cart: CartSlice,
    }
})
export type AppDispatch = typeof store.dispatch
export default store