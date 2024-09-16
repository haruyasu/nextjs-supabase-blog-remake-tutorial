"use client"

import { User } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import Link from "next/link"

interface NavigationProps {
  user: User | null
}

// ナビゲーション
const Navigation = ({ user }: NavigationProps) => {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    if (!window.confirm("ログアウトしますが、宜しいですか？")) {
      return
    }

    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <header className="border-b">
      <div className="mx-auto max-w-screen-lg px-2 py-5 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          フルスタックチャンネル
        </Link>

        <div className="text-sm font-bold">
          {user ? (
            <div className="flex items-center space-x-5">
              <Link href="/blog/new">
                <div>投稿</div>
              </Link>

              <Link href="/settings/profile">
                <div>設定</div>
              </Link>

              <div className="cursor-pointer" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/login">ログイン</Link>
              <Link href="/signup">サインアップ</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navigation
