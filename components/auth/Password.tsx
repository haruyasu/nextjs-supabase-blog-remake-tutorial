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
import { Loader2, EyeOffIcon, EyeIcon } from "lucide-react"
import { PasswordSchema } from "@/schemas"
import { setPassword } from "@/actions/auth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import FormError from "@/components/auth/FormError"

// パスワード変更
const Password = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [passwordVisibility1, setPasswordVisibility1] = useState(false)
  const [passwordVisibility2, setPasswordVisibility2] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      confirmation: "",
    },
  })

  // 送信
  const onSubmit = (values: z.infer<typeof PasswordSchema>) => {
    setError("")

    startTransition(async () => {
      try {
        const res = await setPassword({
          ...values,
        })

        if (res?.error) {
          setError(res.error)
          return
        }

        toast.success("パスワードを変更しました")
        router.push("/password/success")
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
        パスワード設定
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">パスワード</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={passwordVisibility1 ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      disabled={isPending}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                      onClick={() =>
                        setPasswordVisibility1(!passwordVisibility1)
                      }
                    >
                      {passwordVisibility1 ? (
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

          <FormField
            control={form.control}
            name="confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">確認用パスワード</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={passwordVisibility2 ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      disabled={isPending}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                      onClick={() =>
                        setPasswordVisibility2(!passwordVisibility2)
                      }
                    >
                      {passwordVisibility2 ? (
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
              <span>送信</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Password
