import { notFound } from 'next/navigation';
import { getServiceById, getRegionById } from '@/lib/data';
import ServiceDetails from '@/components/service-details';

type Props = {
  params: { region: string; category: string; serviceId: string };
};

export default function ServicePage({ params }: Props) {
  const service = getServiceById(params.serviceId);
  if (!service) notFound();

  const region = getRegionById(params.region);
  if (!region) notFound();
  
  const category = region.categories.find(c => c.id === params.category);
  if (!category) notFound();
  
  if(service.regionId !== region.id || service.categoryId !== category.id) {
    notFound();
  }

  return <ServiceDetails service={service} region={region} category={category} />;
}

export async function generateStaticParams() {
    const { services } = await import('@/lib/data');
    return services.map((service) => ({
        region: service.regionId,
        category: service.categoryId,
        serviceId: service.id,
    }));
}
