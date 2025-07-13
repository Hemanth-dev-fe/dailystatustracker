import mongoose from "mongoose"

const MONGODB_URI=process.env.MONGODB_URI

if(!MONGODB_URI)
{
 throw new Error("please define the MONGODB_URI...")
}

let catched=global.mongoose

if(!catched)
{
    catched=global.mongoose={connectiondb:null,connectionpromise:null}
}

export async function connectDB()
{
    if(catched.connectiondb) return catched.connectiondb

    if(!catched.connectionpromise){
        catched.connectionpromise=mongoose.connect(MONGODB_URI,{
            bufferCommands:false
        })
    }
    catched.connectiondb=await catched.connectionpromise
    return catched.connectiondb

}