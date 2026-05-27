import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import authReducer from '../features/auth/authSlice'
import profileReducer from "../features/profile/profileSlice";
import balanceReducer from "../features/balance/balanceSlice";
import serviceReducer from "../features/service/serviceSlice";
import bannerReducer from "../features/banner/bannerSlice";
import transactionReducer from "../features/transaction/transactionSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        balance: balanceReducer,
        service: serviceReducer,
        banner: bannerReducer,
        transaction: transactionReducer,
    },
});
