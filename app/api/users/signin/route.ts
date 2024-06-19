import User from '@/app/models/User';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import connectDB from '@/config/connectDB';
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    const payload = {
      user: {
        firstname: user.firstname,
        email: user.email,
      },
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: 36000,
    });

    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
      user: user,
      token: token,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
    });

    response.cookies.set('userId', user._id, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
