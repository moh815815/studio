import { ServicesTable } from "@/components/admin/services-table";

export default function AdminServicesPage() {
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8 mb-4 md:mb-8">
        <h1 className="text-2xl font-bold">إدارة جميع المحلات والخدمات</h1>
      </div>
      <div className="grid w-full gap-4 md:gap-8">
        <ServicesTable />
      </div>
    </>
  );
}
