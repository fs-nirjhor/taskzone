import { OrganizationProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <OrganizationProfile
      //routing="hash"
      appearance={{
        elements: {
          rootBox: "w-full shadow-none",
          cardBox: "w-full shadow-none border border-[#e5e5e5]",
        },
      }}
    />
  );
}
