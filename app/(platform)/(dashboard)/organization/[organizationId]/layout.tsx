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
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-20 md:pt-24 2xl:max-w-screen-xl">
      <div className="flex gap-x-7">
        <div className="hidden w-64 shrink-0 md:block">
          <Sidebar />
        </div>
        {children}
        {/* Change organization from nav */}
        <OrgControl />
      </div>
    </div>
  );
};

export default OrganizationLayout;
