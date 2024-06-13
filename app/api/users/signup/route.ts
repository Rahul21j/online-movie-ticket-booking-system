
import User from '@/app/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import connectDB from '@/config/connectDB';
connectDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { firstName, lastName, email, password } = reqBody;

    console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const newPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: newPassword,
    });

    const response = NextResponse.json({
      message: 'Register successful',
      success: true,
      user: newUser,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
