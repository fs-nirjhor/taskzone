import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="sticky bottom-0 flex w-full items-center border-t bg-slate-100 px-4 py-2 shadow-sm">
      <nav className="mx-auto flex w-full items-center justify-between gap-3 md:max-w-screen-2xl">
        <div className="hidden md:block">
          <Logo />
        </div>
        <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          <Button size="sm" variant="ghost" asChild>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/terms-of-service">Terms of service</Link>
          </Button>
        </div>
      </nav>
    </footer>
  );
};
