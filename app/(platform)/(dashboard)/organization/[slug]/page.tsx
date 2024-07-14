import { auth } from "@clerk/nextjs/server"

export default function Organization() {
  const { orgSlug } = auth()
  return (
    <div>Organization: {orgSlug}</div>
  )
}
