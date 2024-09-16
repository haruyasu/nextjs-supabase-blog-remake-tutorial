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
import { EmailSchema } from "@/schemas"
import { updateEmail } from "@/actions/user"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import FormError from "@/components/auth/FormError"

interface EmailProps {
  email: string
}

const Email = ({ email }: EmailProps) => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  })

  // 送信
  const onSubmit = (values: z.infer<typeof EmailSchema>) => {
    setError("")

    startTransition(async () => {
      try {
        const res = await updateEmail({
          ...values,
        })

        if (res?.error) {
          setError(res.error)
          return
        }

        toast.success(
          "メールアドレス変更に必要なURLを記載したメールを送信しました"
        )
        router.push("/email/success")
        router.refresh()
      } catch (error) {
        console.error(error)
        setError("エラーが発生しました")
      }
    })
  }

  return (
    <div>
      <div className="font-bold text-xl text-center mb-10">
        メールアドレス変更
      </div>

      <div className="mb-5">
        <div className="text-sm mb-1 font-bold">現在のメールアドレス</div>
        <div>{email}</div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  新しいメールアドレス
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
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
              <span>変更</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Email
