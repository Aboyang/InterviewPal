import { configureStore } from '@reduxjs/toolkit'
import onBoardingReducer from "./onboardingSlice"

import { logger } from 'redux-logger'

const store = configureStore({

    reducer: {
        onboarding: onBoardingReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)

})

export default store
