import {createAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'

export const userLogin = createAsyncThunk('user/userLogin', async (data:any) =>{
    console.log(data)
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", (response.data._id));
        return response.data;
    } catch (err) {
        console.error(err)
    }
})


// function userAuth(state:any, action:any) {
//     state.status = 'success'
//             // state.user = action.payload
//             state.authenticate = true
//     state.user(action.payload);
// }
// export const resetAction=createAction("lists/reset")


export const userLogged = createAction<any>("user/loggedUser")

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        authenticate: false,
        status: 'idle'
    },
    reducers: {
        // setUser: (state, payload) => {
        //     state.status = 'success'
        //     state.user = payload
        //     state.authenticate = true
        // }
        // switch(action.type){
        // case actionCreator.type: {
           
        //   }
        // }
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
        });
    }
})

export const isUserLoggedIn = () => {
    return async (dispatch:any) => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = localStorage.getItem("user")
        let data = {token, user}
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
// function setUser(): any {
//     throw new Error('Function not implemented.');
// }

