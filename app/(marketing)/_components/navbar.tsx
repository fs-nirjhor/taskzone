import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const Navbar = () => {
  const { userId } : { userId: string | null } = auth();
  return (
    <header className="bg-white fixed top-0 z-50 flex items-center h-14 px-4 border-b shadow-sm w-full">
      <nav className="w-full md:max-w-screen-2xl mx-auto flex items-center justify-between gap-3">
      <div className="hidden md:block"><Logo /></div>
        {userId ? <UserButton /> : <div className="flex items-center justify-between space-x-4 w-full md:block md:w-auto">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" variant="default" asChild>
            <Link href="/sign-up">Get Taskzone for free</Link>
          </Button>
        </div>}
      </nav>
    </header>
  );
};
