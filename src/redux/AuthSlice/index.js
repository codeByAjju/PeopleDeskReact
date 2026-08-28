import { createSlice } from "@reduxjs/toolkit";
import { removeLocalStorageToken } from "../../utils/common.util"
import logger from "../../utils/logger";


export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {},
    superAdminAuth: {},
  },

  reducers: {
    loginAction: (state, action) => {
      return {
        ...state,
        userData: { ...action.payload }
      };
    },
    removeDataFromRedux: (state) => {
      return {
        ...state,
        userData: {}
      };
    },
    logoutSuperAdminAction: (state) => {
      state.superAdminAuth = {};
      state.userData = {};
    },
    updateSuperAdminDataAction: (state, action) => {
      return {
        ...state,
        superAdminAuth: { ...action.payload },
      };
    },
  },
})

export const {
  loginAction,
  removeDataFromRedux,
  logoutSuperAdminAction,
  updateSuperAdminDataAction,
} = authSlice.actions;

export const login = (data) => async dispatch => {
  try {
    dispatch(loginAction(data));
  } catch (err) {
    return err;
  }
}

export const logout = (navigate) => async (dispatch) => {
  try {
    removeLocalStorageToken();
    localStorage.clear();
    dispatch(logoutSuperAdminAction());
    navigate("/login");
  } catch (error) {
    logger(error);
  }
};

export const selectUser = (state) => state.auth.userData;
export const getSuperAdminAuthData = (state) => state.auth.superAdminAuth;
export const getUserAuthData = (state) => state.auth.userData;
export default authSlice.reducer;
