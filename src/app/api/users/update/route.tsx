import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { id, address, country, nextofkinname, nextofkinphone, nextofkinaddress } = reqBody;
    
    //Check if the User already exist
    const user = await User.findOne({ 
        _id: id 
    });


   
  
    user.address = address;
    user.country = country;
    user.nextofkinname = nextofkinname;
    user.nextofkinphone = nextofkinphone;
    user.nextofkinaddress = nextofkinaddress;
    user.profilecomplete = true

    await user.save();

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