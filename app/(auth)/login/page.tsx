import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import Login from "@/components/auth/Login"

const LoginPage = async () => {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  const user = data?.user

  if (user) {
    redirect("/")
  }

  return <Login />
}

export default LoginPage
