import Link from 'next/link';
import { regions } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import AiSearch from '@/components/ai-search';

export default function Home() {
  return (
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

        <section id="regions">
          <h2 className="font-headline mb-6 text-center text-3xl font-semibold">
            اختر منطقتك
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <Link href={`/${region.id}`} key={region.id} className="group">
                <Card className="h-full transform transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-primary">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-headline text-xl">{region.name}</CardTitle>
                      <ArrowLeft className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-[-4px] group-hover:text-primary" />
                    </div>
                    <CardDescription className="pt-1">{region.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
