import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmailVerifyPageProps {
  searchParams: {
    [key: string]: string | undefined
  }
}

const EmailVerifyPage = ({ searchParams }: EmailVerifyPageProps) => {
  const { code, message } = searchParams

  let displayMessage = ""

  if (code) {
    displayMessage =
      "メールアドレスの変更が確認されました。ログインしてください。"
  } else if (message) {
    displayMessage =
      "確認リンクが受け付けられました。もう一方のメールアドレスに送信されたリンクも確認してください。"
  }

  return (
    <div className="w-[500px] bg-white p-5 rounded-xl border">
      <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
        メールアドレス変更
      </div>

      <div className="text-sm text-center mb-5">{displayMessage}</div>

      {code && (
        <Button asChild className="w-full">
          <Link href="/login">ログイン</Link>
        </Button>
      )}
    </div>
  )
}

export default EmailVerifyPage
