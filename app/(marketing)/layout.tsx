import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="min-h-screen flex flex-col justify-between bg-slate-100">
    <Navbar />
    <article className="pt-40 pb-24 px-2 bg-slate-100">{children}</article>
    <Footer />
  </main>;
}
