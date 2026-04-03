import { getPostById } from "@/actions/blog";
import BlogForm from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idNumber = parseInt(id, 10);
  
  if (isNaN(idNumber)) {
    notFound();
  }

  const post = await getPostById(idNumber);

  if (!post) {
    notFound();
  }

  return <BlogForm initialData={post} />;
}
