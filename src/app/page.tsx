import Link from 'next/link';
import EmergencyServices from '@/components/emergency-services';
import RegionFilter from '@/components/region-filter';
import NotificationBanner from '@/components/notification-banner';
import NearbyFinder from '@/components/nearby-finder';

export default function Home() {
  return (
    <>
      <NotificationBanner />
      <main className="flex min-h-screen w-full flex-col items-center bg-background">
        <div className="w-full max-w-4xl p-4 md:p-8">
          <header className="mb-8 text-center">
            <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
              دليل فيصل الذكي
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              استكشف الخدمات من حولك في منطقة فيصل
            </p>
          </header>

          <section id="nearby-finder" className="mb-12">
            <NearbyFinder />
          </section>

          <EmergencyServices />
          
          <RegionFilter />

        </div>
      </main>
    </>
  );
}
