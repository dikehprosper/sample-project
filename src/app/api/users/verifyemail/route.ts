import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {token} = reqBody;

    const decodedToken = decodeURIComponent(token); // ✅ decode token

    console.log("Received Token:", token);
    console.log("Decoded Token:", decodedToken);

    const user = await User.findOne({
      verifyToken: decodedToken,
      verifyTokenExpiry: {$gt: Date.now()},
    });

    if (!user) {
      return NextResponse.json(
        {error: "Invalid or expired token"},
        {status: 400}
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email Verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}
