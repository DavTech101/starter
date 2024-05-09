import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware((auth, req) => {
  // if (!auth().userId && !req.nextUrl.pathname.startsWith('/api/')) {
  //   // Add custom logic to run before redirecting

  //   return auth().redirectToSignIn();
  // }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
