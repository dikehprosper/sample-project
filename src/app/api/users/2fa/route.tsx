import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { isJSDocThrowsTag } from "typescript";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    
  try {
    const reqBody = await request.json();
    const  fullPassword  = reqBody;

    console.log(fullPassword);

    const user = await User.findOne({
      faToken: fullPassword,
      faTokenExpiry: { $gt: Date.now() } ,
    });

  

    if (!user) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }


user.faToken = undefined;
    user.faTokenExpiry = undefined;
    await user.save()
    
    if (user.profilecomplete === false) {
  return NextResponse.json({
    error: "Complete your profile",
    id: user._id // Include the ID in the error response
  }, {
    status: 404 // Use an appropriate status code for an error
  });
}


       const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });


    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
