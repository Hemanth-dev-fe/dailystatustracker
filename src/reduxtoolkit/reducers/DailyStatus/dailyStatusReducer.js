import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const createUserData=createAsyncThunk('user/create',
    async(payload)=>{
        const res=await fetch(`/api/userformapi/userform`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
        })
        return await res.json()
    }
)

export const fetchUserData=createAsyncThunk('user/fetch',async({username,page,limit})=>{

    const res= await fetch(`/api/userformapi/userform?username=${username}&page=${page}&limit=${limit}`)
    return await res.json()
})

// ✅ Simplified version
// ✅ Corrected thunk
export const updateUserData = createAsyncThunk("user/update", async ({ id, ...updateFields }) => {
  const res = await fetch(`/api/userformapi/userform/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateFields),
  });

  if (!res.ok) throw new Error("Failed to update");

  return await res.json();
});



const userSlice=createSlice({
    "name":"DailyStatus",
    initialState:{
        data:[],
        total:0,
        page:1,
        limit:5,
        loading: false, 
        error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUserData.pending,(state)=>{state.loading=true})
        .addCase(fetchUserData.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload.data;
            state.total=action.payload.total
        })
        .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    //   .addCase(createUserData.fulfilled,(state,action)=>{
    //     state.data.unshift(action.payload.data)
    //     state.total+=1
    //   })
    }
})

export default userSlice.reducer