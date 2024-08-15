import { OrganizationList } from "@clerk/nextjs";

export default function SelectOrganizationPage() {
  return (
    <div className="pt-20 md:pt-24 pb-24 px-4 size-full mx-auto flex justify-center items-center">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/organization/:id"
        afterSelectOrganizationUrl="/organization/:id"
      />
    </div>
  );
}
