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
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { ProfileSchema } from "@/schemas"
import { updateProfile } from "@/actions/user"
import { useRouter } from "next/navigation"
import { ProfileType } from "@/types"
import ImageUploading, { ImageListType } from "react-images-uploading"
import toast from "react-hot-toast"
import Image from "next/image"
import FormError from "@/components/auth/FormError"

interface ProfileProps {
  profile: ProfileType
}

const Profile = ({ profile }: ProfileProps) => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const [imageUpload, setImageUpload] = useState<ImageListType>([
    {
      dataURL: profile.avatar_url || "/default.png",
    },
  ])

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: profile.name || "",
      introduce: profile.introduce || "",
    },
  })

  // 送信
  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    setError("")

    let base64Image: string | undefined

    startTransition(async () => {
      try {
        if (
          imageUpload[0].dataURL &&
          imageUpload[0].dataURL.startsWith("data:image")
        ) {
          const image = imageUpload[0]

          if (image.dataURL) {
            base64Image = image.dataURL
          }
        }

        const res = await updateProfile({
          ...values,
          profile,
          base64Image,
        })

        if (res?.error) {
          setError(res.error)
          return
        }

        toast.success("プロフィールを編集しました")
        router.refresh()
      } catch (error) {
        console.error(error)
        setError("エラーが発生しました")
      }
    })
  }

  // 画像アップロード
  const onChangeImage = (imageList: ImageListType) => {
    const file = imageList[0]?.file
    const maxFileSize = 2 * 1024 * 1024

    // ファイルサイズチェック
    if (file && file.size > maxFileSize) {
      setError("ファイルサイズは2MBを超えることはできません")
      return
    }

    setImageUpload(imageList)
  }

  return (
    <div>
      <div className="font-bold text-xl text-center mb-10">プロフィール</div>

      <div className="mb-5">
        <ImageUploading
          value={imageUpload}
          onChange={onChangeImage}
          maxNumber={1}
          acceptType={["jpg", "png", "jpeg"]}
        >
          {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
            <div className="flex flex-col items-center justify-center">
              {imageList.length == 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    onImageUpload()
                  }}
                  className="w-32 h-32 rounded-full bg-gray-200"
                  {...dragProps}
                >
                  <div className="text-gray-400 text-xs">
                    ファイル形式：jpg / jpeg / png
                  </div>
                  <div className="text-gray-400 text-xs">
                    ファイルサイズ：2MBまで
                  </div>
                </button>
              )}

              {imageList.map((image, index) => (
                <div key={index}>
                  {image.dataURL && (
                    <div className="w-32 h-32 relative">
                      <Image
                        fill
                        src={image.dataURL}
                        alt="thumbnail"
                        className="object-cover rounded-full"
                        priority
                        sizes="128px"
                      />
                    </div>
                  )}
                </div>
              ))}

              {imageList.length > 0 && (
                <div className="text-center mt-3">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault()
                      onImageUpdate(0)
                    }}
                  >
                    画像を変更
                  </Button>
                </div>
              )}
            </div>
          )}
        </ImageUploading>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">名前</FormLabel>
                <FormControl>
                  <Input
                    placeholder="田中太郎"
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
            name="introduce"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">自己紹介</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="よろしくお願いします。"
                    rows={7}
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

export default Profile
