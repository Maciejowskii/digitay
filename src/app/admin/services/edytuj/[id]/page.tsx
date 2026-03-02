import { getServiceById } from "@/actions/services";
import ServiceForm from "@/components/admin/ServiceForm";
import { notFound } from "next/navigation";

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const idNumber = parseInt(params.id, 10);
  
  if (isNaN(idNumber)) {
    notFound();
  }

  const service = await getServiceById(idNumber);

  if (!service) {
    notFound();
  }

  return <ServiceForm initialData={service} />;
}
