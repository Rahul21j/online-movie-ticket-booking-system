
import User from '@/app/models/User';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/connectDB';
import { cookies } from 'next/headers'
connectDB();
export async function POST(request: NextRequest, response: NextResponse){
  // try {
  //   const cookieStore = cookies();
  //   const userObject = cookieStore.get('user');
  //   const userEncoded = userObject.value;
  //   const email = Buffer.from(userEncoded, 'base64').toString('utf-8');

  //   const userDetails = await User.findOne({ email }).lean();

  //   if (userDetails) {
  //     console.log('User already exists');
  //     return NextResponse.json(
  //       { error: 'User already exists' },
  //       { status: 400 }
  //     );
  //   }
  //   console.log(userDetails);
  //   const newUser = await User.create({
  //     email: email,
  //   });

  //   const response = NextResponse.json({
  //     message: 'Register successful',
  //     success: true,
  //     user: newUser,
  //   });

  //   return response;
  // } catch (error: any) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
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
