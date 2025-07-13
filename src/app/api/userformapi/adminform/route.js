import { connectDB } from "@/lib/mongodb";
import DailyStatusModel from "@/models/dailyStatus/DailyUpdate";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const query = searchParams.get("query") || "";

    const skip = (page - 1) * limit;

    const searchQuery = {
      $or: [
        { username: { $regex: query, $options: "i" } },
        { today: { $regex: query, $options: "i" } },
        { yesterday: { $regex: query, $options: "i" } },
        {
      $expr: {
        $regexMatch: {
          input: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          regex: query,
          options: "i",
        },
      },
    },
    {
      $expr: {
        $regexMatch: {
          input: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
          regex: query,
          options: "i",
        },
      },}
        /* { totalTickets: { $regex: query, $options: "i" } },
        { inProgress: { $regex: query, $options: "i" } },
        { completed: { $regex: query, $options: "i" } },
        { yetToTake: { $regex: query, $options: "i" } }, 
        if it numeric regext not work 
        */
      ],
    };

    const data = await DailyStatusModel.find(searchQuery)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await DailyStatusModel.countDocuments(searchQuery); // ✅ Correct spelling

    return NextResponse.json({ data, total }, { status: 200 });
  } catch (error) {
    console.error("❌ API error:", error); // helpful for future
    return NextResponse.json(
      { message: error.message || "error occured while getting all users info" },
      { status: 500 }
    );
  }
}
