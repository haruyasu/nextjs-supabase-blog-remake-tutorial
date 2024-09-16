"use client"

import { useState, useTransition } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, Loader2, EyeOffIcon, EyeIcon } from "lucide-react"
import { LoginSchema } from "@/schemas"
import { login } from "@/actions/auth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import FormError from "@/components/auth/FormError"
import Link from "next/link"

// ログイン
const Login = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 送信
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")

    startTransition(async () => {
      try {
        const res = await login({
          ...values,
        })

        if (res?.error) {
          setError(res.error)
          return
        }

        toast.success("ログインしました")
        router.push("/")
        router.refresh()
      } catch (error) {
        console.error(error)
        setError("エラーが発生しました")
      }
    })
  }

  return (
    <div className="w-[500px] p-5 rounded-xl border">
      <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
        ログイン
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">メールアドレス</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@fullstackchannel.com"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">パスワード</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={passwordVisibility ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      disabled={isPending}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                      onClick={() => setPasswordVisibility(!passwordVisibility)}
                    >
                      {passwordVisibility ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 w-full">
            <FormError message={error} />
            <Button
              type="submit"
              className="w-full space-x-2 font-bold"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              <span>ログイン</span>
            </Button>
          </div>
        </form>
      </Form>

      <div className="text-center mt-5 space-y-2">
        <div>
          <Link
            href="/reset-password"
            className="text-sm text-primary font-bold"
          >
            パスワードをお忘れの方はこちら{" "}
            <ChevronRight className="w-4 h-4 inline align-text-bottom" />
          </Link>
        </div>

        <div>
          <Link href="/signup" className="text-sm text-primary font-bold">
            アカウント登録はこちら{" "}
            <ChevronRight className="w-4 h-4 inline align-text-bottom" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
