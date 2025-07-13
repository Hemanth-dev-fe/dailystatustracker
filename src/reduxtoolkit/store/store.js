import { configureStore } from "@reduxjs/toolkit"
import userSlice from "@/reduxtoolkit/reducers/DailyStatus/dailyStatusReducer"
import AdminSlice from "@/reduxtoolkit/reducers/DailyStatus/adminStatusReducer"
const store=configureStore({
    reducer:{
        user:userSlice,
        admin:AdminSlice
    }
})
export default store