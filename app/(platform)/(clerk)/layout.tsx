const ClerkLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen flex justify-center items-center bg-slate-100">
      {children}
    </main>
  );
};
export default ClerkLayout;
