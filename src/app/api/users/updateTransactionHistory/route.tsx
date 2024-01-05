import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import TransactionHistory from "../../../../components/transaction-history/transactionHistory";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { id, email, status, name, amount, addressSentTo, network } = reqBody;
    console.log(email);
    console.log(id);
    console.log(status);

    // Check if the User already exists
    const user = await User.findOne({ email });
    console.log(user.referrals);
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    const userTransactionHistory = user.transactionHistory.find(
      (t: any) => t._id.toString() === id
    );

    if (userTransactionHistory && status === "approve") {
      userTransactionHistory.status = "approved";

       // Deduct the amount from the user's balance based on the 'name'
  if (name === "Bitcoin") {
    user.BTCBalance -= amount;
  } else if (name === "USDT") {
    user.USDTBalance -= amount;
  } else if (name === "Ethereum") {
    user.ETHBalance -= amount;
  } else if (name === "TRON") {
    user.TRONBalance -= amount; 
  } else if (name === "Binance") {
    user.BNBBalance -= amount;
  } else if (name === "Bitcoin Cash") {
    user.BCHBalance -= amount;
  } else if (name === "Dogecoin") {
    user.DOGEBalance -= amount;
  }

  await user.save();

      return NextResponse.json(
        {
          error: "transaction was approved",
        },
        { status: 405 }
      );
    }

    if (userTransactionHistory && status === "disapprove") {
      userTransactionHistory.status = "disapproved";
      await user.save();
      return NextResponse.json(
        {
          error: "transaction was disapproved",
        },
        { status: 406 }
      );
    }

    user.transactionHistory.push({
      amount: amount,
      name: name,
      addressSentTo: addressSentTo,
      network: network,
      status: "Pending",
      typeOfTransaction: "send",
      registrationDateTime: new Date(),
    });

    await user.save();

    return NextResponse.json({
      message: "History added",
      success: true,
      user,
    });
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
