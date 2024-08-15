import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="h-full flex flex-col justify-between bg-slate-100">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default DashboardLayout;
