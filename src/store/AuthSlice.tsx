import {createAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'

export const userLogin = createAsyncThunk('user/userLogin', async (data:any) =>{
    console.log(data)
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", (response.data._id));
        localStorage.setItem('userEmail', response.data.email)
        return response.data;
    } catch (err) {
        console.error(err)
    }
})

export const signout = () =>{
    return async (dispatch:any) => {
    localStorage.clear()
    dispatch(userLoggedOut())
    }
}


export const userLogged = createAction<any>("user/loggedUser")
export const userLoggedOut = createAction('SOME_ACTION_TYPE')

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        authenticate: false,
        status: 'idle'
    },
    reducers: {
        
    },
    extraReducers(builder){
        builder
        .addCase(userLogin.pending, (state,action) => {
            state.status = 'loading'
        })
        .addCase(userLogin.fulfilled, (state,action) => {
            state.status = 'success'
            state.user = action.payload
            state.authenticate = true
        }
        )
        .addCase(userLogin.rejected, (state, action) => {
            state.status = 'rejected'
        })
        .addCase(userLogged, (state, action:PayloadAction<any>) => {
            // state =
            state.status = 'success'    
            state.user = action.payload
            state.authenticate = true
        })
        .addCase(userLoggedOut, (state, action) => {
            state.authenticate = false
            // return initialState
            // ...initState
            
        })
    }
})

export const isUserLoggedIn = () => {
    return async (dispatch:any) => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = localStorage.getItem("user")
        const email = localStorage.getItem('userEmail')
        let data = {token, user, email}
        dispatch(userLogged(data));
      }     
    // else {
    //     dispatch({
    //       type: authConstants.LOGIN_FAILURE,
    //       payload: { error: "Failed to login" },
    //     });
    //   }
    };
  };
  

  export const getAuth = (state:any) => state.auth;
  export default AuthSlice.reducer;


