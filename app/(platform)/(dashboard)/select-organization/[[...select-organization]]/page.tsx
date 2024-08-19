import { OrganizationList } from "@clerk/nextjs";

export default function SelectOrganizationPage() {
  return (
    <div className="mx-auto flex size-full items-center justify-center px-4 pb-24 pt-20 md:pt-24">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/organization/:id"
        afterSelectOrganizationUrl="/organization/:id"
      />
    </div>
  );
}
