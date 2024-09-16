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
import { Loader2 } from "lucide-react"
import { ResetPasswordSchema } from "@/schemas"
import { resetPassword } from "@/actions/auth"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import FormError from "@/components/auth/FormError"

// パスワード再設定
const ResetPassword = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  // 送信
  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("")

    startTransition(async () => {
      try {
        const res = await resetPassword({
          ...values,
        })

        if (res?.error) {
          setError(res.error)
          return
        }

        toast.success("パスワード再設定用のメールを送信しました")
        router.push("/reset-password/success")
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
        パスワード再設定
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

export default ResetPassword
