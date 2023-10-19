import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { email, subject, message, priority } = reqBody;

    //Check if the User already exist
    const user = await User.findOne({
      email,
    });

    user.tickets.push({
      subject: subject,
      message: message,
      priority: priority,
      status: "open",
      registrationDateTime: new Date(),
    });

    await user.save();

    const response = NextResponse.json({
      message: "update Successful",
      success: true,
      user,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
