"use client"

import { BlogType } from "@/types"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"

interface BlogItemProps {
  blog: BlogType & {
    profiles: {
      name: string
      avatar_url: string
    }
  }
}

const BlogItem = ({ blog }: BlogItemProps) => {
  return (
    <div className="break-words border rounded">
      <Link href={`blog/${blog.id}`}>
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={blog.image_url || "/noImage.png"}
            className="rounded-t object-cover transition-transform duration-100 ease-in-out hover:scale-105"
            alt="image"
            width={640}
            height={360}
            priority
          />
        </div>
      </Link>

      <div className="p-3 space-y-2">
        <div className="text-gray-500 text-xs">
          {format(new Date(blog.updated_at), "yyyy/MM/dd HH:mm")}
        </div>
        <div className="font-bold">{blog.title}</div>
        <div className="flex items-center space-x-3">
          <Image
            src={blog.profiles.avatar_url || "/default.png"}
            className="rounded-full"
            alt="avatar"
            width={30}
            height={30}
          />
          <div className="text-sm">{blog.profiles.name}</div>
        </div>
      </div>
    </div>
  )
}

export default BlogItem
