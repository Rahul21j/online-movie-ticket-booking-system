
import User from '@/app/models/User';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/connectDB';
import { cookies } from 'next/headers'
connectDB();
export async function POST(request: NextRequest, response: NextResponse){

  try {
    const { email } = await request.json();
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      user = await User.create({ email });
    }
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }  
}
