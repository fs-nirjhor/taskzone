import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { calSans, poppins } from "@/lib/fonts";

export default function MarketingPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center px-4 pb-24 pt-40">
      <section
        className={cn(
          "flex flex-col items-center justify-center",
          calSans.className,
        )}
      >
        <div className="mb-4 flex items-center justify-center gap-3 rounded-full border bg-amber-100 px-4 py-2 uppercase text-amber-700 shadow-sm">
          <Medal className="h-6 w-6" />
          <h3 className="[word-spacing:0.25rem]">No 1 Task Management App</h3>
        </div>
        <h1 className="mb-6 text-center text-3xl text-neutral-600 md:text-6xl">
          Taskzone helps team move
        </h1>
        <p className="w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-purple-600 px-5 py-3 text-center text-3xl text-white md:text-6xl">
          Work Forward
        </p>
      </section>
      <p
        className={cn(
          "mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl",
          poppins.className,
        )}
      >
        Collaborate, manage projects and reach ne productivity peaks. From high
        piority tasks to due dates in seconds, the way your team works is unique
        - accomplish it all with Taskzone.
      </p>
      <Button variant="default" className="mx-auto mt-8" asChild>
        <Link href="/signup">Get Taskzone for free</Link>
      </Button>
    </main>
  );
}
