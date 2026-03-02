import { getServices } from "@/actions/services";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  const servicesData = await getServices();

  return <ServicesClient services={servicesData} />;
}
