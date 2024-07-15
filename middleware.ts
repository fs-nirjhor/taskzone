import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRouteMatcher = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId, orgSlug, protect } = auth();
  const isPublicRoute = publicRouteMatcher(req);
  // if its not a public route and the user is not logged in we redirect to /sign-in
  if (!isPublicRoute) protect();
  //* logged in user can't visit public route
  if (userId) {
    //* logged in user must have an organization
    let path = "/select-organization";
    if (orgSlug) {
      path = `/organization/${orgSlug}`;
    }
    // if user is not on correct page we redirect to it
    if (req.nextUrl.pathname !== path) {
      return NextResponse.redirect(new URL(path, req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
