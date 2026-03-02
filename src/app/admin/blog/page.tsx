import { getPosts } from "@/actions/blog";
import BlogClient from "./BlogClient";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  const posts = await getPosts();

  return <BlogClient posts={posts} />;
}
