import {configureStore} from '@reduxjs/toolkit'
import productSlice from './ProductSlice'
import AuthSlice from './AuthSlice'

const store = configureStore({
    reducer: {
        product: productSlice,
        auth: AuthSlice,
    }
})
export type AppDispatch = typeof store.dispatch
export default store