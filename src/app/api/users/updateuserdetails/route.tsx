import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
   
    const {
      email,
      fullname,
      phone,
      address,
      gender,
      country,
      residentialaddress,
      nextofkinname,
      nextofkinphone,
      nextofkinaddress,
    } = reqBody;


    //Check if the User already exist
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log(reqBody, "console.log(reqBody);");

    (user.email = email),
      (user.fullname = fullname),
      (user.phone = phone),
      (user.address = address),
      (user.gender = gender),
      (user.country = country),
      (user.residentialaddress = residentialaddress),
      (user.nextofkinname = nextofkinname),
      (user.nextofkinphone = nextofkinphone),
      (user.nextofkinaddress = nextofkinaddress),
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
