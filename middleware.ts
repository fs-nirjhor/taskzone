import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRouteMatcher = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId, orgId, protect } = auth();
  const isPublicRoute = publicRouteMatcher(req);

  //* user must sign-in to visit public route
  if (!isPublicRoute) protect();

  //* logged in user can't visit public route
  if (isPublicRoute && userId) {
    const orgRedirectPath = orgId
      ? `/organization/${orgId}`
      : "/select-organization";
    return NextResponse.redirect(new URL(orgRedirectPath, req.url));
  }

  //* logged in user must have an organization
  if (userId && !orgId && req.nextUrl.pathname !== "/select-organization") {
    return NextResponse.redirect(new URL("/select-organization", req.url));
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
