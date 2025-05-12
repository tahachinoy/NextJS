import { NextResponse } from 'next/server';
import { signUp } from '@/lib/cognito';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  const { username, password, email } = await req.json();
  try {
    await signUp(username, password, email);
    const cookie = serialize('signupInitiated', 'true', {
      httpOnly: true,
      path: '/',         
      maxAge: 300,
      sameSite: 'strict'
    });
    return NextResponse.json({ success: true }, {
      headers: { 'Set-Cookie': cookie }
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}


