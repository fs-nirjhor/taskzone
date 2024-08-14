import { auth } from "@clerk/nextjs/server";
import { Sidebar } from "../../_components/sidebar";
import { OrgControl } from "./_components/org-control";
import { startCase } from "lodash";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "Organization"),
  };
}

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-x-7">
      <div className="w-64 shrink-0 hidden md:block">
        <Sidebar />
      </div>
      {children}
      {/* Change organization by nav */}
      <OrgControl />
    </div>
  );
};

export default OrganizationLayout;
