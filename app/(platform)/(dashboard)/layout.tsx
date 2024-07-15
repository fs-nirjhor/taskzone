import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return <main className="min-h-screen flex flex-col justify-between bg-slate-100">
    {/* TODO: Mobile navbar */}
    <Navbar />
    <article className="pt-24 pb-24 px-4">{children}</article>
    <Footer />
  </main>;
};

export default DashboardLayout;
