import { ArrowUpRight, CalendarDays, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Link } from "@/i18n/routing"

interface Blog {
  title: string
  cook_time: string
  author: string
  created_at: string
  description: string
  slug: string
}

interface BlogCardProps {
  blog: Blog
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const { title, cook_time, author, created_at, description, slug } = blog

  return (
    <Card>
      <CardHeader>
        <p className="text-xl font-bold">{title}</p>
        <div className="flex items-center gap-2">
          <Badge>
            <p className="text-xs">{author}</p>
          </Badge>
          <Badge>
            <CalendarDays className="w-4 h-4 me-1" />
            <p className="text-xs">{created_at}</p>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium">{description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <Badge className={"w-fit"}>
            <Clock className="w-4 h-4 me-1" />
            <p className="text-xs">{cook_time}</p>
          </Badge>
          <Link href={`/blogs/${slug}`} className="flex items-center gap-1">
            <p className="text-sm font-medium hover:underline">Read more</p>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default BlogCard
