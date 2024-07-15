
const OrganizationLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="flex gap-x-7">
      <div className="w-64 shrink-0 hidden md:block">Sidebar</div>
      {children}
    </div>
  );
};

export default OrganizationLayout;
