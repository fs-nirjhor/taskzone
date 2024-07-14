import { Navbar } from "./_components/navbar";

const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return <main className="min-h-screen flex flex-col justify-between bg-slate-100">
    {/* TODO: Mobile navbar */}
    <Navbar />
    <article className="pt-20 pb-16 px-2">{children}</article>
  </main>;
};

export default DashboardLayout;
