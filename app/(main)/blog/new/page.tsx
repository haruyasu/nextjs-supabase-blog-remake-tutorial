import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import BlogNew from "@/components/blog/BlogNew"
import Loading from "@/app/loading"

const BlogNewPage = async () => {
  const supabase = createClient()
  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user

  if (!user) {
    redirect("/")
  }

  return (
    <Suspense fallback={<Loading />}>
      <BlogNew userId={user.id} />
    </Suspense>
  )
}

export default BlogNewPage
