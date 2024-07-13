import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex min-h-screen flex-col justify-between bg-slate-100">
    <Navbar />
    <article className="pt-40 pb-24 bg-slate-100">{children}</article>
    <Footer />
  </main>;
}
