import { getPostById } from "@/actions/blog";
import BlogForm from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const idNumber = parseInt(params.id, 10);
  
  if (isNaN(idNumber)) {
    notFound();
  }

  const post = await getPostById(idNumber);

  if (!post) {
    notFound();
  }

  return <BlogForm initialData={post} />;
}
