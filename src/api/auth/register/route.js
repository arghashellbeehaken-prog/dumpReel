import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db/db";
import User from "@/models/User";

export const POST = async (NextRequest) => {
  try {
    const { username, email, password } = await NextRequest.json();
    if(!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 400 }
      );
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User registration failed.." },
      { status: 500 }
    );
  }
};  
