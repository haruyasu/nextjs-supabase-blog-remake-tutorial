import { createClient } from "@/utils/supabase/server"
import { Suspense } from "react"
import BlogItem from "@/components/blog/BlogItem"
import Loading from "@/app/loading"

// メインページ
const MainPage = async () => {
  const supabase = createClient()

  // ブログ一覧取得
  const { data: blogsData, error } = await supabase
    .from("blogs")
    .select(
      `
      *,
      profiles (
        name,
        avatar_url
      )
    `
    )
    .order("updated_at", { ascending: false })

  if (!blogsData || error) {
    return <div className="text-center">ブログが投稿されていません</div>
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="grid grid-cols-3 gap-5">
        {blogsData.map((blog) => {
          return <BlogItem key={blog.id} blog={blog} />
        })}
      </div>
    </Suspense>
  )
}

export default MainPage
