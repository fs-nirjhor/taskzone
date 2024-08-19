const ClerkLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex h-full items-center justify-center bg-slate-100">
      {children}
    </main>
  );
};
export default ClerkLayout;
