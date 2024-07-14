import { OrganizationList } from "@clerk/nextjs";

export default function OrganizationListPage() {
  return (
    <div className="flex justify-center items-center">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/organization/:slug"
        afterSelectOrganizationUrl="/organization/:slug"
      />
    </div>
  );
}
