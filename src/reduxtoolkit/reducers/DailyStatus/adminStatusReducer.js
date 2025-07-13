import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchAllUsersData=createAsyncThunk("admin/allusersdata",async({page=1,query=""})=>{
    const res=await fetch(`/api/userformapi/adminform?page=${page}&limit=10&query=${query}`)
    const data= await res.json()
    console.log("✅ Result from API:", data);
    return data
})

const AdminSlice=createSlice(
    {
        "name":"admin view",
        initialState:{
            allUsersData:[],
            selectedUserData:null,
            totalUsers:0,
            currentPage:1,
            query:""
        },
        reducers:{
            selectedUserInfo:(state,action)=>{

                state.selectedUserData=action.payload
            },
            closedSelectedUserData:(state)=>{
                state.selectedUserData=null
            },
            setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
        },
        extraReducers:(builder)=>{
            builder.addCase(fetchAllUsersData.fulfilled,(state,action)=>{
                state.allUsersData = action.payload.data;
      state.totalUsers = action.payload.total;
            })
        }
    }
)
export const {selectedUserInfo,closedSelectedUserData,setPage,setQuery}=AdminSlice.actions
export default AdminSlice.reducer