import { Button } from "@/components/ui/button"
import Link from "next/link"

const PasswordSuccessPage = () => {
  return (
    <div className="w-[500px] bg-white p-5 rounded-xl border">
      <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
        パスワード設定完了
      </div>

      <div className="text-sm text-center mb-5">
        パスワードの変更が完了しました。
        <br />
        ログインしてご利用ください。
      </div>

      <Button asChild className="w-full">
        <Link href="/login">ログイン</Link>
      </Button>
    </div>
  )
}

export default PasswordSuccessPage
