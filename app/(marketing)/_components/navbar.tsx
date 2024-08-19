import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <nav className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-screen-2xl">
        <div className="hidden md:block">
          <Logo />
        </div>
        <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" variant="default" asChild>
            <Link href="/sign-up">Get Taskzone for free</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};
