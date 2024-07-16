import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return <main className="min-h-screen flex flex-col justify-between bg-slate-100">
    <Navbar />
    <article className="pt-20 md:pt-24 pb-24 px-4 w-full max-w-6xl 2xl:max-w-screen-xl mx-auto">{children}</article>
    <Footer />
  </main>;
};

export default DashboardLayout;
