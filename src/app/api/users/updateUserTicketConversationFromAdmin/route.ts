import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { message, email, id, status } = reqBody;

    // Check if the User already exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the correct ticket by its _id
    const ticket = user.tickets.find((t: any) => t._id.toString() === id);

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 405 });
    }

    if (status === "close") {
      ticket.status = "closed";
      await user.save();
      return NextResponse.json(
        { error: "Ticket has been Closed" },
        { status: 406 }
      );
    }

      ticket.conversations.push({
      messagefromAdmin: message,
      messagefromUser: "",
      registrationDateTime: new Date(),
    });

    // Add a new conversation to the ticket

    await user.save();

    const response = NextResponse.json({
      message: "conversation added",
      success: true,
      user,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
