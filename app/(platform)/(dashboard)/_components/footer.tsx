import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Footer = () => {
  return (
      <footer className="bg-slate-100 fixed bottom-0 flex items-center px-4 py-2 border-t shadow-sm w-full">
          <nav className="md:max-w-screen-2xl w-full mx-auto flex items-center justify-between gap-3">
              <div className="hidden md:block"><Logo /></div>
              <div className="flex items-center justify-between space-x-4 w-full md:block md:w-auto">
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
}