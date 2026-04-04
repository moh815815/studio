import { getEmergencyServices } from '@/lib/data';
import ShopCard from '@/components/shop-card';
import { AlertCircle } from 'lucide-react';

export default function EmergencyServices() {
  const emergencyServices = getEmergencyServices();

  if (emergencyServices.length === 0) {
    return null;
  }

  return (
    <section id="emergency-services" className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <h2 className="font-headline text-3xl font-semibold">
            خدمات الطوارئ
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {emergencyServices.map(service => (
          <ShopCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
