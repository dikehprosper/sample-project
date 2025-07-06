import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {password, token} = reqBody;

    const decodedToken = decodeURIComponent(token); // ✅ Decode token safely
    console.log("Password:", password);
    console.log("Decoded Token:", decodedToken);

    const user = await User.findOne({
      forgotPasswordToken: decodedToken,
      forgotPasswordTokenExpiry: {$gt: Date.now()},
    });

    if (!user) {
      return NextResponse.json(
        {error: "Invalid or expired token"},
        {status: 400}
      );
    }

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
