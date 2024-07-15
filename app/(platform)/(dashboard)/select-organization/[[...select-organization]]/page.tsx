import { OrganizationList } from "@clerk/nextjs";

export default function OrganizationListPage() {
  return (
    <div className="flex justify-center items-center">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/organization/:id"
        afterSelectOrganizationUrl="/organization/:id"
      />
    </div>
  );
}
