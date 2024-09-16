"use client"

import { usePathname } from "next/navigation"
import { UserRoundPen, Mail, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

// ナビゲーション
const subNavigation = [
  {
    name: "プロフィール",
    icon: UserRoundPen,
    href: "/settings/profile",
  },
  {
    name: "メールアドレス変更",
    icon: Mail,
    href: "/settings/email",
  },
  {
    name: "パスワード変更",
    icon: KeyRound,
    href: "/settings/password",
  },
]

// レイアウト
const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <div className="mx-auto max-w-screen-md">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1 space-y-2">
          {subNavigation.map((item, index) => (
            <Button
              asChild
              key={index}
              variant="ghost"
              className={cn(
                "w-full justify-start font-bold",
                pathname === item.href && "bg-gray-100"
              )}
            >
              <Link href={item.href}>
                <item.icon className="inline-block w-5 h-5 mr-2" />
                {item.name}
              </Link>
            </Button>
          ))}
        </div>
        <div className="col-span-2">{children}</div>
      </div>
    </div>
  )
}

export default SettingsLayout
