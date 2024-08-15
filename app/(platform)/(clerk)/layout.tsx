const ClerkLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="h-full flex justify-center items-center bg-slate-100">
      {children}
    </main>
  );
};
export default ClerkLayout;
