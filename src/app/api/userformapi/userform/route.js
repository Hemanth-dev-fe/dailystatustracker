import { connectDB } from "@/lib/mongodb"
import DailyStatusModel from "@/models/dailyStatus/DailyUpdate"
import { NextResponse } from "next/server"

export async function POST(req)
{

    const body=await req.json()
    try{
await connectDB()
const data= new DailyStatusModel({
username:body.username,
yesterday:body.yesterday,
today:body.today,
todayDate:body.todayDate,
yesterdayDate:body.yesterdayDate,
totalTickets:body.totalTickets,
inProgress:body.inProgress,
completed:body.completed,
yetToTake:body.yetToTake
})
await data.save()
return NextResponse.json({message:"Data Submitted Successfully",data},{ status: 200 })
    }
    catch(err)
    {
        return NextResponse.json({message:err.message||"invalid data passed"},{status: 500})
    }
}

export async function GET(req)
{
    const {searchParams}=new URL(req.url)
    const username=searchParams.get('username');
    const page=parseInt(searchParams.get('page'))||1;
    const limit=5;
    const skip=(page-1)*limit
    try{

        connectDB()
        const query=username?{username}:{}
        const total=await DailyStatusModel.countDocuments(query)
        const data=await DailyStatusModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
        return NextResponse.json({ data, total,limit,page }, { status: 200 });
    }
    catch(err)
    {
        return NextResponse.json({message:err.message||"invalid data passed"},{status: 500})
    }
}