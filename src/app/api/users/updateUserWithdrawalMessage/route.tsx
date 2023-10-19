import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the incoming request
    const reqBody = await request.json();

    // Extract data from the request body
    const { logo, newMessage, email } = reqBody;

    // Find the user based on their email
    const user = await User.findOne({ email });

    // If the user is not found, return a 404 response
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the withdrawal message based on the logo
    if (logo === "BNB") {
      user.BNBWithdrawalMessage = newMessage;
    }
    
    else if (logo === "BTC") {
      user.BTCWithdrawalMessage = newMessage;
    } else if (logo === "USDT") {
      user.USDTWithdrawalMessage = newMessage;
    } else if (logo === "TRC") {
      user.TRONWithdrawalMessage = newMessage;
    } else if (logo === "BCH") {
      user.BCHWithdrawalMessage = newMessage;
    } else if (logo === "ETH") {
      user.ETHWithdrawalMessage = newMessage;
    } else if (logo === "DOGE") {
      user.DOGEWithdrawalMessage = newMessage;
    }

    // Save the updated user
    await user.save();

    console.log(user);

    return NextResponse.json({
      message: "Updated Successfully for the user",
      success: true,
    });
  } catch (error: any) {
    // Handle errors and return a 500 status code
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
