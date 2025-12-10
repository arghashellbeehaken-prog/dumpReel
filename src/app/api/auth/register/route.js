import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db/db";
import User from "@/models/User";

export const POST = async (request) => {
  try {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    console.log("got NextRequest");

    await dbConnect();
    console.log("db connect suceeded");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("EXISTING user found");
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 400 }
      );
    }
    console.log("if condition completed");

    // const newUser = new User({ username, email, password });
    // await newUser.save();
    await User.create({ username, email, password });
    console.log("User Created Successfully");

    return NextResponse.json({ message: "User registered successfully." }, { status: 201 });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json({ message: "User registration failed." }, { status: 500 });
  }
};
