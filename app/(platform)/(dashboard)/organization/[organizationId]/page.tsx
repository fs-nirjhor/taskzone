import { auth } from "@clerk/nextjs/server";
import { OrgControl } from "./_components/org-control";

export default function Organization({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const { orgSlug } = auth();
  return (
    <div>
      <OrgControl />
      <p>Organization: {orgSlug}</p>
    </div>
  );
}
