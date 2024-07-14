import { calSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
    <div className="flex items-center gap-x-2 hover:opacity-75 transition">
      <Image src="/images/taskzone.svg" alt="logo" width={30} height={30} />
      <h3 className={cn("text-lg text-neutral-700", calSans.className)}>Taskzone</h3>
    </div>
    </Link>
  );
};
