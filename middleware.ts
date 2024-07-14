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
  // if its not a public route we protect it
  if (!isPublicRoute) protect();
  if (userId && isPublicRoute) {
    // if the user is logged in and its a public route we send to select organization
    let path = "/select-organization";
    if (orgSlug) {
      // if the user has selected organization we send to that organization
      path = `/organization/${orgSlug}`;
    }
    if (req.nextUrl.pathname !== path) {
      // if user is not on correct page we redirect to it
      return NextResponse.redirect(new URL(path, req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
