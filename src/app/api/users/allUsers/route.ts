import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId });

    // Check if the user making the request is an admin
    if (user.isAdmin) {
      // If the user is an admin, return all users from the database with passwords

      const allUsers = await User.find();
      const filteredUsers = allUsers.filter(
        (u) => u._id.toString() !== userId.toString()
      );
      return NextResponse.json({
        message: "Admin request",
        data: filteredUsers,
      });
    } else {
      // If the user is not an admin, return only their own details without the password
      const userData = await User.findOne({ _id: userId }).select("-password");
      return NextResponse.json({
        message: "User found",
        data: userData,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

connect();
