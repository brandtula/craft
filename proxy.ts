import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/ops/:path*', '/ops'],
};

export function proxy(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    const validUser = process.env.OPS_USERNAME || 'admin';
    const validPass = process.env.OPS_PASSWORD || 'admin';

    if (user === validUser && pwd === validPass) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
