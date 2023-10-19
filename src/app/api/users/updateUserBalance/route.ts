import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { logo, action, email, amount, amountBalance } = reqBody;
    console.log(amount);
    console.log(action);
    console.log(logo);
    console.log(email);
        console.log(amountBalance);

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

    if (logo === "BNB" && action === "Add") {
      user.BNBBalance += parseFloat(amount); 
       user.totalDepositedAmount += amountBalance

       user.transactionHistory.push({
      amount: amount,
      name: "Binance",
      addressSentTo: user.BNBAddress,
      network: "---",
      status: "approved",
      typeOfTransaction: "received",
      registrationDateTime: new Date(),
    });

    } else if (logo === "BNB" && action === "Remove") {
      user.BNBBalance -= parseFloat(amount); 
    }

    if (logo === "BTC" && action === "Add") {
      user.BTCBalance += parseFloat(amount);
       user.totalDepositedAmount += amountBalance
       user.transactionHistory.push({
      amount: amount,
      name: "Bitcoin",
      addressSentTo: user.BTCAddress,
      network: "---",
      status: "approved",
      typeOfTransaction: "received",
      registrationDateTime: new Date(),
    });
    } else if (logo === "BTC" && action === "Remove") {
      user.BTCBalance -= parseFloat(amount); 
    }

    if (logo === "USDT" && action === "Add") {
      user.USDTBalance += parseFloat(amount);
       user.totalDepositedAmount += amountBalance
       user.transactionHistory.push({
      amount: amount,
      name: "USDT",
      addressSentTo: user.USDTAddress,
      network: "---",
      status: "approved",
      typeOfTransaction: "received",
      registrationDateTime: new Date(),
    });
    
   
    } else if (logo === "USDT" && action === "Remove") {
      user.USDTBalance -= parseFloat(amount); 
    }

    if (logo === "TRC" && action === "Add") {
      user.TRONBalance += parseFloat(amount); 
       user.totalDepositedAmount += amountBalance
     user.transactionHistory.push({
    amount: amount,
      name: "TRON",
      addressSentTo: user.TRONAddress,
        network: "---",
      status: "approved",
      typeOfTransaction: "received",
      registrationDateTime: new Date(),
     })


    } else if (logo === "TRC" && action === "Remove") {
      user.TRONBalance -= parseFloat(amount); 
    }
    if (logo === "BCH" && action === "Add") {
      user.BCHBalance += parseFloat(amount); 
       user.totalDepositedAmount += amountBalance 
  user.transactionHistory.push({
    amount: amount,
      name: "Bitcoin Cash",
      addressSentTo: user.BCHAddress,
        network: "---",
      status: "approved",
      typeOfTransaction: "received",
      registrationDateTime: new Date(),
     })




    } else if (logo === "BCH" && action === "Remove") {
      user.BCHBalance -= parseFloat(amount); 
    }
    if (logo === "ETH" && action === "Add") {
      user.ETHBalance += parseFloat(amount); 
       user.totalDepositedAmount += amountBalance
        user.transactionHistory.push({
        amount: amount,
        name: "Ethereum",
        addressSentTo: user.ETHAddress,
        network: "---",
        status: "approved",
        typeOfTransaction: "received",
        registrationDateTime: new Date(),
       })

    } else if (logo === "ETH" && action === "Remove") {
      user.ETHBalance -= parseFloat(amount); 
    }

    if (logo === "DOGE" && action === "Add") {
      user.DOGEBalance += parseFloat(amount); 
       user.totalDepositedAmount += amountBalance
        user.transactionHistory.push({
        amount: amount,
        name: "Dogecoin",
        addressSentTo: user.DOGEAddress,
        network: "---",
        status: "approved",
        typeOfTransaction: "received",
        registrationDateTime: new Date(),
       })

      
    } else if (logo === "DOGE" && action === "Remove") {
      user.DOGEBalance -= parseFloat(amount); 
    }

    await user.save();

    return NextResponse.json({
      message: "Updated Successfully",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
