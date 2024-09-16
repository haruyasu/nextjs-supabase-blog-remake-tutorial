import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import Email from "@/components/settings/Email"
import Loading from "@/app/loading"

const EmailPage = async () => {
  const supabase = createClient()
  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user

  if (!user || !user.email) {
    redirect("/")
  }

  return (
    <Suspense fallback={<Loading />}>
      <Email email={user.email} />
    </Suspense>
  )
}

export default EmailPage
