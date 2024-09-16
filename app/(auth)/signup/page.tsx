import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import Signup from "@/components/auth/Signup"

const SignupPage = async () => {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  const user = data?.user

  if (user) {
    redirect("/")
  }

  return <Signup />
}

export default SignupPage
