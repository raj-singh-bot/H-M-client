import {configureStore} from '@reduxjs/toolkit'
import productSlice from './ProductSlice'
import AuthSlice from './AuthSlice'
import CartSlice from './CartSlice'
import UserSlice from './UserSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        product: productSlice,
        cart: CartSlice,
        user: UserSlice,
    }
})
export type AppDispatch = typeof store.dispatch
export default store