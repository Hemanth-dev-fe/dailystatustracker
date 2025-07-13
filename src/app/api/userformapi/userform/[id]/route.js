import { connectDB } from "@/lib/mongodb";
import DailyStatusModel from "@/models/dailyStatus/DailyUpdate";
import { NextResponse } from "next/server";

export async function PUT(req, context) {
  const { id } = context.params; // ✅ correct way to access dynamic route params

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  let body = {};
  try {
    body = await req.json(); // await this to avoid JSON parse errors
  } catch (err) {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  try {
    await connectDB();

    const updated = await DailyStatusModel.findByIdAndUpdate(
      id,
      {
        $set: {
          yesterday: body.yesterday,
          today: body.today,
          totalTickets: body.totalTickets,
          inProgress: body.inProgress,
          completed: body.completed,
          yetToTake: body.yetToTake,
          yesterdayDate: body.yesterdayDate,
          todayDate: body.todayDate,
        },
      },
      { new: true }
    );

    return NextResponse.json({ message: "Updated Successfully", data: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
