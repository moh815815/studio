import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AiSearch from '@/components/ai-search';
import EmergencyServices from '@/components/emergency-services';
import RegionFilter from '@/components/region-filter';
import NotificationBanner from '@/components/notification-banner';

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
              استكشف الخدمات من حولك أو دع الذكاء الاصطناعي يساعدك
            </p>
          </header>

          <section id="ai-search" className="mb-12">
            <AiSearch />
          </section>

          <EmergencyServices />
          
          <RegionFilter />

          <section id="add-service" className="mt-12">
              <Card className="bg-accent/10 border-accent">
                  <CardHeader className="flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                      <div className='flex-grow'>
                          <CardTitle className="font-headline text-2xl text-accent-foreground">هل أنت صاحب عمل؟</CardTitle>
                          <CardDescription className='mt-1'>أضف محلك أو خدمتك إلى دليل فيصل مجاناً.</CardDescription>
                      </div>
                      <Button asChild size="lg" className='w-full md:w-auto'>
                          <Link href="/add-service">أضف الآن <ArrowLeft className="h-4 w-4 ms-2" /></Link>
                      </Button>
                  </CardHeader>
              </Card>
          </section>
        </div>
      </main>
    </>
  );
}
