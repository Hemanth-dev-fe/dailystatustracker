import mongoose from "mongoose";

const DailyStatusSchema=new mongoose.Schema(
    {
        username:{type:String,required:true},
        yesterday:{type:String,required:true},
        today:{type:String,required:true},
        todayDate:{type:String,required:true},
        yesterdayDate:{type:String,required:true},
        totalTickets:{type:Number,required:true},
        inProgress:{type:Number,required:true},
        completed:{type:Number,required:true},
        yetToTake:{type:Number,required:true}

    },{
        timestamps:true
    }
)

const DailyStatusModel=mongoose.models.DailyStatus || new mongoose.model("DailyStatus",DailyStatusSchema)
export default DailyStatusModel