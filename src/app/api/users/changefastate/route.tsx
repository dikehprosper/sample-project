import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { email } = reqBody;


    console.log(email)
    //Check if the User already exist
    const user = await User.findOne({ 
     email
    });

 
  console.log(user.fastatus)
    user.fastatus = !user.fastatus;
      console.log(!user.fastatus)

    await user.save();
console.log("successful")
    return NextResponse.json({
      message: "Email Verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

