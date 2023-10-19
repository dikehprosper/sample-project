import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { isJSDocThrowsTag } from "typescript";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";
connect();
import isOnline from "is-online"; 

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;


       const online = await isOnline();
    if (!online) {
      return NextResponse.json(
        { error: "No internet connection" },
        { status: 501 } // You can choose an appropriate status code
      );
    }

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 },
      );
    }

      //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 402 });
    }

    if (user.isVerified === false) {
      return NextResponse.json(
        { error: "User is not verified" },
        { status: 401 },
      );
    }
    
     if (user.fastatus === true) {
   console.log(user._id)
        sendEmail({
      email,
      emailType: "SEND",
      userId: user._id,
      fullname: user.fullname,
    });

      return NextResponse.json(
        { error: "check your mail for 2fa password" },
        { status: 403 },
      );
    }

    
if (user.profilecomplete === false) {
  return NextResponse.json({
    error: "Complete your profile",
    id: user._id // Include the ID in the error response
  }, {
    status: 404 // Use an appropriate status code for an error
  });
}



    console.log(user.isVerified);

  
    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      user
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
