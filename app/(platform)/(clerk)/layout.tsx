const ClerkLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex min-h-screen justify-center items-center bg-slate-100">
      {children}
    </main>
  );
};
export default ClerkLayout;
