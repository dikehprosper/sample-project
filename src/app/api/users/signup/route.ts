import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { referralId, fullname, email, phone, password } = reqBody;
    //Check if the User already exist
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      phone,
      password: hashedPassword,
      password2: password,
      BTCBalance: 0,
      USDTBalance: 0,
      ETHBalance: 0,
      TRONBalance: 0,
      BNBBalance: 0,
      BCHBalance: 0,
      DOGEBalance: 0,
      BTCAddress: "bbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      USDTAddress: "uuuuuuuuuuuuuuuuuuuuuuuuuuuu",
      ETHAddress: "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      TRONAddress: "ttttttttttttttttttttttttttttt",
      BNBAddress: "bnbnbnbnbnbnbnbnbnbnbbnbnbnbnbn",
      BCHAddress: "bchbchbchbchbchbchbchbchbchbchbch",
      DOGEAddress: "ddddddddddddddddddddddddddddddddd",
      BTCWithdrawalMessage: "",
      USDTWithdrawalMessage: "",
      ETHWithdrawalMessage: "",
      TRONWithdrawalMessage: "",
      BNBWithdrawalMessage: "",
      BCHWithdrawalMessage: "",
      DOGEWithdrawalMessage: "",
      totalDepositedAmount: 0,
    });

    const savedUser = await newUser.save();

    // Declare user2 outside of the if block

    if (referralId) {
      let user2;
      user2 = await User.findOne({ _id: referralId });
      if (user2) {
        // User with the specified _id found
        user2.referrals.push({
          referredEmail: savedUser.email,
          referredName: savedUser.fullname,
          registrationDateTime: new Date(),
        });

        await user2.save();
        console.log(user2.referrals);
        // You can return user2 here or perform further actions
      } else {
        // User with the specified _id not found
        console.log("User not found");
      }
    }

    // Modify the referral information

    // send Welcome email

    await sendEmail({
      email,
      emailType: "WELCOME",
      userId: savedUser._id,
      fullname,
    });

    // send verification email

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
      fullname,
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
